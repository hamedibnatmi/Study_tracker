import { useEffect, useMemo, useState } from "react";
import supabase from "../SupaBase"; 
import "../styles/Profile.css";
import { User, Mail, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  const [userInfo, setUserInfo] = useState({ name: "—", email: "—" });
  const [statsTop, setStatsTop] = useState({
    courses: 0,
    sessions: 0,
    totalMinutes: 0,
  });

  // Study Statistics state
  const [subjectStats, setSubjectStats] = useState([]);
  const [maxMinutes, setMaxMinutes] = useState(1);

  const totalTimeLabel = useMemo(() => {
    const mins = statsTop.totalMinutes || 0;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h <= 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }, [statsTop.totalMinutes]);

  useEffect(() => {
    async function loadProfileStats() {
      // 1) current user
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Auth error:", authError.message);
        return;
      }

      const userId = authData?.user?.id;
      const email = authData?.user?.email ?? "—";

      if (!userId) {
        setUserInfo({ name: "Not logged in", email });
        return;
      }

      // 2) Fetch: profile name, courses (id/title), sessions (course_id/duration)
      
      const profilePromise = supabase
        .from("profiles")
        .select("full_name") 
        .eq("id", userId)
        .maybeSingle();

      const coursesPromise = supabase
        .from("courses")
        .select("id, title")
        .eq("user_id", userId);

      const sessionsPromise = supabase
        .from("study_sessions")
        .select("course_id, duration")
        .eq("user_id", userId);

      const [
        { data: profileData, error: profileError },
        { data: coursesData, error: coursesError },
        { data: sessionsData, error: sessionsError },
      ] = await Promise.all([profilePromise, coursesPromise, sessionsPromise]);

      if (profileError) console.error("Profile error:", profileError.message);
      if (coursesError) console.error("Courses error:", coursesError.message);
      if (sessionsError) console.error("Sessions error:", sessionsError.message);

      // name
      const nameFromProfile = profileData?.full_name; 

      setUserInfo({
        name: nameFromProfile ?? "User",
        email,
      });

      // 3) Top stats
      const sessionsArr = sessionsData ?? [];
      const totalMinutes = sessionsArr.reduce(
        (sum, row) => sum + (row.duration ?? 0),
        0
      );

      setStatsTop({
        courses: (coursesData ?? []).length,
        sessions: sessionsArr.length,
        totalMinutes,
      });

      // 4) Build Study Statistics (minutes per course title)
      const courseTitleById = new Map(
        (coursesData ?? []).map((c) => [c.id, c.title])
      );

      const minutesByCourse = new Map();
      for (const s of sessionsArr) {
        const cid = s.course_id;
        const dur = s.duration ?? 0;
        minutesByCourse.set(cid, (minutesByCourse.get(cid) ?? 0) + dur);
      }

      const palette = ["p1", "p2", "p3", "p1", "p2", "p3"];

      const builtStats = Array.from(minutesByCourse.entries())
        .map(([courseId, minutes], idx) => ({
          name: courseTitleById.get(courseId) ?? "Unknown course",
          minutes,
          colorClass: palette[idx % palette.length],
        }))
        .sort((a, b) => b.minutes - a.minutes);

      const maxM = Math.max(1, ...builtStats.map((x) => x.minutes));
      setSubjectStats(builtStats);
      setMaxMinutes(maxM);
    }

    loadProfileStats();
  }, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    
    navigate("/login");
  };

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1>Profile</h1>
          <p>Manage your account settings</p>
        </div>

        {/* Account Information */}
        <section className="card">
          <h2 className="card-title">Account Information</h2>

          <div className="account-row">
            <div className="avatar">
              <User size={26} />
            </div>

            <div className="account-info">
              <div className="name">{userInfo.name}</div>
              <div className="email">
                <Mail size={16} />
                <span>{userInfo.email}</span>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-value">{statsTop.courses}</div>
              <div className="stat-label">Courses</div>
            </div>

            <div className="stat-box">
              <div className="stat-value">{statsTop.sessions}</div>
              <div className="stat-label">Sessions</div>
            </div>

            <div className="stat-box">
              <div className="stat-value">{totalTimeLabel}</div>
              <div className="stat-label">Total Time</div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="card">
          <h2 className="card-title">Settings</h2>

          <div className="setting-row">
            <div className="setting-left">
              <div className="setting-icon">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <div className="setting-title">Dark Mode</div>
                <div className="setting-subtitle">
                  {darkMode ? "Enabled" : "Disabled"}
                </div>
              </div>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Log Out
          </button>
        </section>

        {/* Study Statistics */}
        <section className="card">
          <h2 className="card-title">Study Statistics</h2>

          <div className="subjects">
            {subjectStats.length === 0 ? (
              <p style={{ color: "#6b7280", margin: 0 }}>
                No study sessions yet.
              </p>
            ) : (
              subjectStats.map((s) => {
                const percent = Math.round((s.minutes / maxMinutes) * 100);
                return (
                  <div key={s.name} className="subject">
                    <div className="subject-top">
                      <div className="subject-name">
                        <span className={`dot ${s.colorClass}`} />
                        {s.name}
                      </div>
                      <div className="subject-min">{s.minutes} min</div>
                    </div>

                    <div className="bar">
                      <div
                        className={`bar-fill ${s.colorClass}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
