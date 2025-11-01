import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from '@radix-ui/react-icons';

interface Drive {
  id: number;
  company: string;
  role: string;
  salary: string;
  location: string;
  deadline: string;
  status: 'Eligible' | 'Applied' | 'Not Eligible' | 'Offered';
  type: string;
  skills: string[];
  ctc: string;
  startsIn: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'warning' | 'info' | 'error';
  icon: string;
}

interface CalendarEvent {
  date: number;
  title: string;
  time: string;
}

const MOCK_DRIVES: Drive[] = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineer Intern',
    salary: '₹6,00,000',
    ctc: '₹6,00,000',
    location: 'Bangalore',
    deadline: '2024-07-31',
    startsIn: '31 Aug',
    status: 'Eligible',
    type: 'Summer Intern',
    skills: ['Python', 'C++', 'Data Structures']
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'Data Analyst',
    salary: '₹18 LPA',
    ctc: '₹18 LPA',
    location: 'Hyderabad',
    deadline: '2024-08-01',
    startsIn: '25 Aug',
    status: 'Applied',
    type: 'Full-Time',
    skills: ['SQL', 'Power BI', 'Excel', 'Python']
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Product Manager',
    salary: '₹22 LPA',
    ctc: '₹22 LPA',
    location: 'Chennai',
    deadline: '2024-07-28',
    startsIn: '10 Aug',
    status: 'Not Eligible',
    type: 'Full-Time',
    skills: ['Office', 'Agile', 'B.A Skills', 'JIRA']
  },
  {
    id: 4,
    company: 'Adobe',
    role: 'Front-end Developer',
    salary: '₹15 LPA',
    ctc: '₹15 LPA',
    location: 'Noida',
    deadline: '2024-08-05',
    startsIn: '26 Aug',
    status: 'Eligible',
    type: 'Full-Time',
    skills: ['JavaScript', 'React', 'Next', 'CSS']
  },
  {
    id: 5,
    company: 'Tata Consultancy',
    role: 'Graduate Trainee',
    salary: '₹3.5 LPA',
    ctc: '₹3.5 LPA',
    location: 'PMO India',
    deadline: '2024-07-15',
    startsIn: '1 Aug',
    status: 'Applied',
    type: 'Full-Time',
    skills: ['Java', 'C', 'SQL']
  },
  {
    id: 6,
    company: 'Salesforce',
    role: 'SDE Intern',
    salary: '₹60,000/mo',
    ctc: '₹60,000/mo',
    location: 'Hyderabad',
    deadline: '2024-08-15',
    startsIn: '25 Aug',
    status: 'Not Eligible',
    type: 'Summer Intern',
    skills: ['Oracle', 'Apex', 'React', 'SFDX']
  },
  {
    id: 7,
    company: 'Netflix',
    role: 'DevOps Engineer',
    salary: '₹20 LPA',
    ctc: '₹20 LPA',
    location: 'Mumbai',
    deadline: '2024-08-20',
    startsIn: '1 Sep',
    status: 'Eligible',
    type: 'Full-Time',
    skills: ['Kubernetes', 'AWS', 'CI/CD']
  },
  {
    id: 8,
    company: 'Apple',
    role: 'iOS Developer',
    salary: '₹30 LPA',
    ctc: '₹30 LPA',
    location: 'Bangalore',
    deadline: '2024-08-25',
    startsIn: '5 Sep',
    status: 'Eligible',
    type: 'Full-Time',
    skills: ['Swift', 'SwiftUI', 'Xcode']
  },
  {
    id: 9,
    company: 'Tesla',
    role: 'ML Engineer',
    salary: '₹35 LPA',
    ctc: '₹35 LPA',
    location: 'Pune',
    deadline: '2024-09-01',
    startsIn: '10 Sep',
    status: 'Eligible',
    type: 'Full-Time',
    skills: ['Python', 'TensorFlow', 'PyTorch']
  },
  {
    id: 10,
    company: 'Meta',
    role: 'Cloud Engineer',
    salary: '₹28 LPA',
    ctc: '₹28 LPA',
    location: 'Hyderabad',
    deadline: '2024-09-05',
    startsIn: '15 Sep',
    status: 'Applied',
    type: 'Full-Time',
    skills: ['React Native', 'Swift', 'Kotlin']
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [];

const CALENDAR_EVENTS: CalendarEvent[] = [
  { date: 16, title: 'Google Application Deadline', time: '11:59 PM' },
  { date: 16, title: 'Mock Interview', time: '10:00 AM' },
  { date: 16, title: 'Placement Test', time: '2:00 PM' }
];

export default function DrivesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'drives' | 'analytics'>('drives');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeType, setActiveType] = useState('');
  const [paginationPage, setPaginationPage] = useState(1);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
const [detailsModalOpen, setDetailsModalOpen] = useState(false);
const [applicationModalOpen, setApplicationModalOpen] = useState(false);
const [applyingDrive, setApplyingDrive] = useState<Drive | null>(null);
  const itemsPerPage = 6;

  const [advancedFilters, setAdvancedFilters] = useState({
    branches: [] as string[],
    driveMode: [] as string[],
    companyType: [] as string[],
    ctcMin: 0,
    ctcMax: 50,
    dateRange: { start: '', end: '' }
  });

  const statusOptions = ['All', 'Eligible', 'Applied', 'Offered', 'Not Eligible'];
  const typeOptions = ['Summer Intern', 'Full-Time', '6-Month Intern'];
  const branches = ['All', 'CS', 'ECE', 'Mech', 'EEE', 'Civil'];
  const driveModes = ['Any', 'Online', 'Offline'];
  const companyTypes = ['Any', 'Product', 'Service', 'Startup'];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredDrives = useMemo(() => {
    return MOCK_DRIVES.filter(drive => {
      const matchesSearch = drive.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesStatus = true;
      if (activeStatus === 'Eligible') matchesStatus = drive.status === 'Eligible';
      else if (activeStatus === 'Applied') matchesStatus = drive.status === 'Applied';
      else if (activeStatus === 'Offered') matchesStatus = drive.status === 'Offered';
      else if (activeStatus === 'Not Eligible') matchesStatus = drive.status === 'Not Eligible';
      
      const matchesType = !activeType || drive.type === activeType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, activeStatus, activeType]);

  const totalPages = Math.ceil(filteredDrives.length / itemsPerPage);
  const startIndex = (paginationPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDrives = filteredDrives.slice(startIndex, endIndex);

  React.useEffect(() => {
    setPaginationPage(1);
  }, [searchQuery, activeStatus, activeType]);
  const getDrivesForDate = (day: number) => {
  const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  return MOCK_DRIVES.filter(drive => {
    const deadline = new Date(drive.deadline);
    return deadline.getDate() === day &&
           deadline.getMonth() === currentMonth.getMonth() &&
           deadline.getFullYear() === currentMonth.getFullYear();
  });
};
// Auto-update calendar to current date at midnight
React.useEffect(() => {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const msUntilMidnight = tomorrow.getTime() - now.getTime();

  const midnightTimer = setTimeout(() => {
    setCurrentMonth(new Date());
    setSelectedDate(null);
    
    // Set up daily interval after first midnight
    const dailyInterval = setInterval(() => {
      setCurrentMonth(new Date());
      setSelectedDate(null);
    }, 24 * 60 * 60 * 1000); // 24 hours

    return () => clearInterval(dailyInterval);
  }, msUntilMidnight);

  return () => clearTimeout(midnightTimer);
}, []);

const hasDeadline = (day: number) => {
  return getDrivesForDate(day).length > 0;
};

 const colors = {
  primary: theme === 'light' ? '#2952d9ff' : '#108fe9ff',
  primaryDark: theme === 'light' ? '#2952d9ff' : '#2952d9ff',
  background: theme === 'light' ? '#FFFBFE' : '#1C1B1F',
  card: theme === 'light' ? '#FFFFFF' : '#2B2930',
  text: theme === 'light' ? '#1C1B1F' : '#E6E1E5',
  textMuted: theme === 'light' ? '#49454F' : '#CAC4D0',
  border: theme === 'light' ? '#ece0e8ff' : '#3F3E43',
  iconColor: theme === 'light' ?  '#3F3E43' : '#CAC4D0',
  gradient: 'linear-gradient(135deg, #6750A4 0%, #4F378B 100%)',
  shadow: theme === 'light' ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' : '0 2px 6px 0 rgba(0, 0, 0, 0.3)'
};

  const statusColors: Record<string, { bg: string; text: string }> = {
    'Eligible': { bg: theme === 'light' ? '#dcfce7' : '#064e3b', text: '#10b981' },
    'Applied': { bg: theme === 'light' ? '#dbeafe' : '#1e3a8a', text: '#3b82f6' },
    'Offered': { bg: theme === 'light' ? '#fef3c7' : '#78350f', text: '#f59e0b' },
    'Not Eligible': { bg: theme === 'light' ? '#fee2e2' : '#7f1d1d', text: '#ef4444' }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

 const isToday = (day: number) => {
  const today = new Date();
  return day === today.getDate() && 
         currentMonth.getMonth() === today.getMonth() && 
         currentMonth.getFullYear() === today.getFullYear();
};

 const hasEvent = (day: number) => {
  return hasDeadline(day);
};

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const calendarDays = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div style={{
      background: colors.background,
      color: colors.text,
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scaleY(1);
            opacity: 0.8;
          }
          50% {
            transform: scaleY(0.7);
            opacity: 1;
          }
        }
      `}</style>

      {/* Auto-Hide Left Sidebar - Trigger Zone */}
     {/* Toggle Button for Left Sidebar */}
{/* Toggle Button for Left Sidebar - Tall Vertical Tab */}
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  style={{
    position: 'fixed',
    left: sidebarOpen ? '240px' : '0px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '120px', // Increased from 100px to 120px
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderLeft: sidebarOpen ? `1px solid ${colors.border}` : 'none',
    borderRadius: sidebarOpen ? '0 18px 18px 0' : '0 18px 18px 0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
    transition: 'all 0.3s ease',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
    color: colors.iconColor,
    padding: '0'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = colors.background;
    e.currentTarget.style.width = '26px';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = colors.card;
    e.currentTarget.style.width = '20px';
  }}
>
  {sidebarOpen ? (
    <Icons.ChevronLeftIcon width={14} height={14} />
  ) : (
    <Icons.ChevronRightIcon width={14} height={14} />
  )}
</button>

{/* Left Sidebar Drawer */}
<div 
  style={{
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '240px',
    background: colors.card,
    borderRight: `1px solid ${colors.border}`,
    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: sidebarOpen ? '8px 0 32px rgba(0,0,0,0.15)' : 'none'
  }}
>
        <div style={{ 
          padding: '20px 16px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <button
            onClick={() => setCurrentPage('drives')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: currentPage === 'drives' ? colors.primary : 'transparent',
              color: currentPage === 'drives' ? '#fff' : colors.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'drives') {
                e.currentTarget.style.background = colors.background;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'drives') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Icons.ListBulletIcon width={20} height={20} />
            Drives
          </button>

          <button
            onClick={() => setCurrentPage('analytics')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: currentPage === 'analytics' ? colors.primary : 'transparent',
              color: currentPage === 'analytics' ? '#fff' : colors.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'analytics') {
                e.currentTarget.style.background = colors.background;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'analytics') {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Icons.BarChartIcon width={20} height={20} />
            Analytics
          </button>
        </div>

      <div style={{ flex: 1 }}></div>
      </div>
      {/* Overlay when sidebar is open */}
{sidebarOpen && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.3)',
      zIndex: 99,
      transition: 'background 0.3s ease'
    }}
    onClick={() => setSidebarOpen(false)}
  />
)}

      {/* Notifications Drawer */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '380px',
        maxWidth: '100%',
        background: colors.card,
        borderLeft: `1px solid ${colors.border}`,
        transform: notificationsOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: notificationsOpen ? '-8px 0 32px rgba(0,0,0,0.15)' : 'none'
      }}>
        <div style={{
          padding: '16px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text }}>Notifications</h3>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '4px' }}>
              {unreadCount === 0 ? 'All caught up' : `${unreadCount} unread`}
            </div>
          </div>
          <button
            onClick={() => setNotificationsOpen(false)}
            style={{
              border: 'none',
              background: 'transparent',
              color: colors.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              transition: 'all 0.2s',
              borderRadius: '6px'
            }}
          >
            <Icons.Cross2Icon width={18} height={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '40px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `${colors.primary}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Icons.BellIcon width={40} height={40} style={{ color: colors.primary, opacity: 0.6 }} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>
                No Notifications
              </div>
              <div style={{ fontSize: '14px', color: colors.textMuted, lineHeight: '1.5' }}>
                You're all caught up!
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {notificationsOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 95,
            transition: 'background 0.3s ease'
          }}
          onClick={() => setNotificationsOpen(false)}
        />
      )}

      {/* Header */}
      <header style={{
        background: colors.card,
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ 
              fontWeight: '700', 
              fontSize: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Kumaraguru College
            </div>
            <div style={{ 
              fontSize: '9px', 
              color: colors.textMuted,
              fontWeight: '400'
            }}>
              Powered by HireTrack
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '450px', marginLeft: '20px', marginRight: 'auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              background: colors.background,
              padding: '8px 12px'
            }}>
              <Icons.MagnifyingGlassIcon width={16} height={16} style={{ color: colors.iconColor }} />
              <input
                type="text"
                placeholder="Search drives, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  marginLeft: '8px',
                  background: 'transparent',
                  color: colors.text,
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: '6px',
                background: colors.background,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                color: colors.iconColor,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.border;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.background;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Icons.BellIcon width={18} height={18} />
            </button>

            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: '6px',
                background: colors.background,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.iconColor,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.border;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.background;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {theme === 'light' ? <Icons.MoonIcon width={18} height={18} /> : <Icons.SunIcon width={18} height={18} />}
            </button>
            
            <button 
              style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: '6px',
                background: colors.background,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.iconColor,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.border;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.background;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Icons.PersonIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Analytics Page */}
      {currentPage === 'analytics' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 70px)',
          padding: '40px'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '32px',
              height: '100px'
            }}>
              {[60, 80, 50, 90, 70, 85, 65].map((height, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '12px',
                    height: `${height}px`,
                    background: `linear-gradient(180deg, #667eea ${idx * 10}%, #764ba2 100%)`,
                    borderRadius: '4px 4px 0 0',
                    animation: `pulse ${1 + idx * 0.1}s ease-in-out infinite`,
                    opacity: 0.8
                  }}
                />
              ))}
            </div>

            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: colors.text,
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Analytics Page
            </h1>
            
            <p style={{
              fontSize: '16px',
              color: colors.textMuted,
              lineHeight: '1.6'
            }}>
              Analytics dashboard coming soon
            </p>
          </div>
        </div>
      )}

      {/* Drives Page */}
      {currentPage === 'drives' && (
        <main style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          gap: '20px'
        }}>
          <div style={{ flex: 1 }}>
            {/* Combined Filters */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              overflowX: 'auto',
              flexWrap: 'nowrap',
              paddingBottom: '4px'
            }}>
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    background: activeStatus === status ? colors.primary : colors.card,
                    color: activeStatus === status ? '#fff' : colors.text,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    if (activeStatus !== status) {
                      e.currentTarget.style.background = colors.background;
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeStatus !== status) {
                      e.currentTarget.style.background = colors.card;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {status}
                </button>
              ))}
              
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(activeType === type ? '' : type)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    background: activeType === type ? colors.primary : colors.card,
                    color: activeType === type ? '#fff' : colors.text,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    if (activeType !== type) {
                      e.currentTarget.style.background = colors.background;
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeType !== type) {
                      e.currentTarget.style.background = colors.card;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '13px', color: colors.textMuted, fontWeight: '500' }}>
                {filteredDrives.length} opportunities
              </div>
              <div style={{
                display: 'flex',
                gap: '4px',
                padding: '4px',
                borderRadius: '8px',
                background: colors.background,
                border: `1px solid ${colors.border}`
              }}>
                <button
                  onClick={() => setViewMode('card')}
                  style={{
                    padding: '8px',
                    border: 'none',
                    background: viewMode === 'card' ? colors.card : 'transparent',
                    color: colors.text,
                    cursor: 'pointer',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== 'card') {
                      e.currentTarget.style.background = colors.card;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== 'card') {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icons.GridIcon width={16} height={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px',
                    border: 'none',
                    background: viewMode === 'list' ? colors.card : 'transparent',
                    color: colors.text,
                    cursor: 'pointer',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (viewMode !== 'list') {
                      e.currentTarget.style.background = colors.card;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (viewMode !== 'list') {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icons.ListBulletIcon width={16} height={16} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <details style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              marginBottom: '16px',
              padding: '14px',
              boxShadow: colors.shadow
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                userSelect: 'none',
                color: colors.text
              }}>
                <span>Advanced Filters</span>
                <Icons.ChevronDownIcon width={18} height={18} />
              </summary>
              
              <div style={{
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: colors.textMuted, display: 'block', marginBottom: '8px' }}>
                    Branch
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {branches.map((branch) => (
                      <button
                        key={branch}
                        onClick={() => {
                          setAdvancedFilters(prev => {
                            const isIncluded = prev.branches.includes(branch);
                            return {
                              ...prev,
                              branches: isIncluded
                                ? prev.branches.filter(b => b !== branch)
                                : [...prev.branches, branch]
                            };
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          border: advancedFilters.branches.includes(branch) ? 'none' : `1px solid ${colors.border}`,
                          background: advancedFilters.branches.includes(branch) ? colors.primary : 'transparent',
                          color: advancedFilters.branches.includes(branch) ? '#fff' : colors.text,
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          if (!advancedFilters.branches.includes(branch)) {
                            e.currentTarget.style.background = colors.background;
                            e.currentTarget.style.borderColor = colors.primary;
                          }
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (!advancedFilters.branches.includes(branch)) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = colors.border;
                          }
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: colors.textMuted, display: 'block', marginBottom: '8px' }}>
                    Drive Mode
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {driveModes.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setAdvancedFilters(prev => {
                            const isIncluded = prev.driveMode.includes(mode);
                            return {
                              ...prev,
                              driveMode: isIncluded
                                ? prev.driveMode.filter(m => m !== mode)
                                : [...prev.driveMode, mode]
                            };
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          border: advancedFilters.driveMode.includes(mode) ? 'none' : `1px solid ${colors.border}`,
                          background: advancedFilters.driveMode.includes(mode) ? colors.primary : 'transparent',
                          color: advancedFilters.driveMode.includes(mode) ? '#fff' : colors.text,
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          if (!advancedFilters.driveMode.includes(mode)) {
                            e.currentTarget.style.background = colors.background;
                            e.currentTarget.style.borderColor = colors.primary;
                          }
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (!advancedFilters.driveMode.includes(mode)) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = colors.border;
                          }
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: colors.textMuted, display: 'block', marginBottom: '8px' }}>
                    Company Type
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {companyTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setAdvancedFilters(prev => {
                            const isIncluded = prev.companyType.includes(type);
                            return {
                              ...prev,
                              companyType: isIncluded
                                ? prev.companyType.filter(t => t !== type)
                                : [...prev.companyType, type]
                            };
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          border: advancedFilters.companyType.includes(type) ? 'none' : `1px solid ${colors.border}`,
                          background: advancedFilters.companyType.includes(type) ? colors.primary : 'transparent',
                          color: advancedFilters.companyType.includes(type) ? '#fff' : colors.text,
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          if (!advancedFilters.companyType.includes(type)) {
                            e.currentTarget.style.background = colors.background;
                            e.currentTarget.style.borderColor = colors.primary;
                          }
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (!advancedFilters.companyType.includes(type)) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = colors.border;
                          }
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: colors.textMuted, 
                    display: 'block', 
                    marginBottom: '8px' 
                  }}>
                    CTC Range (LPA): ₹{advancedFilters.ctcMin}+
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={advancedFilters.ctcMin}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, ctcMin: parseInt(e.target.value) }))}
                    style={{ 
                      width: '100%', 
                      cursor: 'pointer',
                      height: '6px',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '16px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  onClick={() => {
                    console.log('Filters applied:', advancedFilters);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: colors.primary,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.primaryDark;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.primary;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveStatus('All');
                    setActiveType('');
                    setAdvancedFilters({
                      branches: [],
                      driveMode: [],
                      companyType: [],
                      ctcMin: 0,
                      ctcMax: 50,
                      dateRange: { start: '', end: '' }
                    });
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1px solid ${colors.border}`,
                    background: 'transparent',
                    color: colors.text,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.background;
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icons.ReloadIcon width={14} height={14} />
                  Reset
                </button>
              </div>
            </details>

            {/* Card View */}
            {viewMode === 'card' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginBottom: '16px'
              }}>
                {paginatedDrives.map((drive) => (
                  <div
                    key={drive.id}
                    style={{
                      background: colors.card,
                      borderRadius: '10px',
                      border: `1px solid ${colors.border}`,
                      padding: '10px',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      boxShadow: colors.shadow
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = theme === 'light' 
                        ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = colors.shadow;
                      e.currentTarget.style.borderColor = colors.border;
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: colors.background,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: colors.primary,
                        border: `1px solid ${colors.border}`
                      }}>
                        {drive.company.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '13px', color: colors.text }}>
                          {drive.company}
                        </div>
                        <div style={{ fontSize: '10px', color: colors.textMuted }}>
                          {drive.type}
                        </div>
                      </div>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '9px',
                        fontWeight: '600',
                        background: statusColors[drive.status].bg,
                        color: statusColors[drive.status].text
                      }}>
                        {drive.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '600', color: colors.text, marginBottom: '10px' }}>
                      {drive.role}
                    </div>

                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: '6px', 
                      marginBottom: '10px',
                      fontSize: '11px',
                      color: colors.textMuted
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.ValueIcon width={11} height={11} style={{ color: colors.iconColor }} />
                        <span>{drive.ctc}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.GlobeIcon width={11} height={11} style={{ color: colors.iconColor }} />
                        <span>{drive.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.CalendarIcon width={11} height={11} style={{ color: colors.iconColor }} />
                        <span>Due: {new Date(drive.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.ClockIcon width={11} height={11} style={{ color: colors.iconColor }} />
                        <span>Starts: {drive.startsIn}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {drive.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          style={{
                            padding: '3px 7px',
                            borderRadius: '4px',
                            fontSize: '9px',
                            background: colors.background,
                            color: colors.text,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                   <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    setSelectedDrive(drive);
    setDetailsModalOpen(true);
  }}
  style={{
    flex: 1,
    textAlign: 'center',
    padding: '7px',
    color: colors.primary,
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.textDecoration = 'underline';
    e.currentTarget.style.color = colors.primaryDark;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.textDecoration = 'none';
    e.currentTarget.style.color = colors.primary;
  }}
>
  View Details
</a>
                    <button
  onClick={() => {
    if (drive.status === 'Eligible') {
      setApplyingDrive(drive);
      setApplicationModalOpen(true);
    }
  }}
  style={{
    flex: 1,
    padding: '7px',
    borderRadius: '6px',
    border: 'none',
    background: drive.status === 'Eligible' ? colors.primary : colors.border,
    color: '#fff',
    cursor: drive.status === 'Eligible' ? 'pointer' : 'not-allowed',
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => {
    if (drive.status === 'Eligible') {
      e.currentTarget.style.background = colors.primaryDark;
      e.currentTarget.style.transform = 'scale(1.05)';
    }
  }}
  onMouseLeave={(e) => {
    if (drive.status === 'Eligible') {
      e.currentTarget.style.background = colors.primary;
      e.currentTarget.style.transform = 'scale(1)';
    }
  }}
>
  {drive.status === 'Applied' ? 'Applied' : drive.status === 'Offered' ? 'Offered' : 'Quick Apply'}
</button>
                    </div>
                  </div>
                  
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div style={{
                background: colors.card,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                overflow: 'hidden',
                marginBottom: '16px',
                boxShadow: colors.shadow
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{
                    background: colors.background,
                    borderBottom: `1px solid ${colors.border}`
                  }}>
                    <tr>
                      {['COMPANY', 'ROLE', 'CTC', 'LOCATION', 'DEADLINE', 'STATUS', 'ACTION'].map((header) => (
                        <th
                          key={header}
                          style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontSize: '10px',
                            fontWeight: '700',
                            color: colors.textMuted,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDrives.map((drive, idx) => (
                    <tr 
  key={drive.id}
  onClick={() => {
    setSelectedDrive(drive);
    setDetailsModalOpen(true);
  }}
  style={{
    borderBottom: idx !== paginatedDrives.length - 1 ? `1px solid ${colors.border}` : 'none',
    transition: 'background 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = colors.background;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'transparent';
  }}
>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              background: colors.background,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              fontWeight: '700',
                              color: colors.primary,
                              border: `1px solid ${colors.border}`
                            }}>
                              {drive.company.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>
                                {drive.company}
                              </div>
                              <div style={{ fontSize: '10px', color: colors.textMuted }}>
                                {drive.type}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: colors.text, fontWeight: '500' }}>
                          {drive.role}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: colors.text }}>
                          {drive.ctc}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: colors.textMuted }}>
                          {drive.location}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: colors.textMuted }}>
                          {new Date(drive.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: '600',
                            background: statusColors[drive.status].bg,
                            color: statusColors[drive.status].text,
                            display: 'inline-block'
                          }}>
                            {drive.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button
  onClick={(e) => {
    e.stopPropagation(); // Prevent row click
    if (drive.status === 'Eligible') {
      setApplyingDrive(drive);
      setApplicationModalOpen(true);
    }
  }}
  
  style={{
                              padding: '6px 14px',
                              borderRadius: '6px',
                              border: 'none',
                              background: drive.status === 'Eligible' ? colors.primary : colors.border,
                              color: '#fff',
                              cursor: drive.status === 'Eligible' ? 'pointer' : 'not-allowed',
                              fontSize: '11px',
                              fontWeight: '600',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              if (drive.status === 'Eligible') {
                                e.currentTarget.style.background = colors.primaryDark;
                                e.currentTarget.style.transform = 'scale(1.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (drive.status === 'Eligible') {
                                e.currentTarget.style.background = colors.primary;
                                e.currentTarget.style.transform = 'scale(1)';
                              }
                            }}
                          >
                            {drive.status === 'Applied' ? 'Applied' : drive.status === 'Offered' ? 'Offered' : 'Apply Now'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                marginTop: '12px'
              }}>
                <button
                  onClick={() => setPaginationPage(prev => Math.max(1, prev - 1))}
                  disabled={paginationPage === 1}
                                    style={{
                    padding: '6px 10px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    background: colors.card,
                    color: colors.text,
                    cursor: paginationPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '11px',
                    fontWeight: '500',
                    opacity: paginationPage === 1 ? 0.5 : 1,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (paginationPage !== 1) {
                      e.currentTarget.style.background = colors.background;
                      e.currentTarget.style.borderColor = colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (paginationPage !== 1) {
                      e.currentTarget.style.background = colors.card;
                      e.currentTarget.style.borderColor = colors.border;
                    }
                  }}
                >
                  ← Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPaginationPage(page)}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: paginationPage === page ? 'none' : `1px solid ${colors.border}`,
                      borderRadius: '6px',
                      background: paginationPage === page ? colors.primary : colors.card,
                      color: paginationPage === page ? '#fff' : colors.text,
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (paginationPage !== page) {
                        e.currentTarget.style.background = colors.background;
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (paginationPage !== page) {
                        e.currentTarget.style.background = colors.card;
                        e.currentTarget.style.borderColor = colors.border;
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setPaginationPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={paginationPage === totalPages}
                  style={{
                    padding: '6px 10px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    background: colors.card,
                    color: colors.text,
                    cursor: paginationPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '11px',
                    fontWeight: '500',
                    opacity: paginationPage === totalPages ? 0.5 : 1,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (paginationPage !== totalPages) {
                      e.currentTarget.style.background = colors.background;
                      e.currentTarget.style.borderColor = colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (paginationPage !== totalPages) {
                      e.currentTarget.style.background = colors.card;
                      e.currentTarget.style.borderColor = colors.border;
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar - LARGER */}
          <aside style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'sticky',
            top: '80px',
            height: 'fit-content'
          }}>
           {/* Calendar - LARGER */}
<div style={{
  background: colors.card,
  borderRadius: '10px',
  border: `1px solid ${colors.border}`,
  padding: '14px',
  boxShadow: colors.shadow
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  }}>
    <span style={{ fontWeight: '600', fontSize: '13px', color: colors.text }}>{getMonthName(currentMonth)}</span>
    <div style={{ display: 'flex', gap: '4px' }}>
      <button
        onClick={handlePrevMonth}
        style={{
          width: '24px',
          height: '24px',
          border: 'none',
          borderRadius: '4px',
          background: colors.background,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.iconColor,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.border;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.background;
        }}
      >
        <Icons.ChevronLeftIcon width={13} height={13} />
      </button>
      <button
        onClick={handleNextMonth}
        style={{
          width: '24px',
          height: '24px',
          border: 'none',
          borderRadius: '4px',
          background: colors.background,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.iconColor,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.border;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.background;
        }}
      >
        <Icons.ChevronRightIcon width={13} height={13} />
      </button>
    </div>
  </div>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '3px',
    textAlign: 'center',
    marginBottom: '8px'
  }}>
    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
      <div key={day} style={{
        fontSize: '10px',
        fontWeight: '600',
        color: colors.textMuted,
        padding: '4px 0'
      }}>
        {day}
      </div>
    ))}
    {calendarDays.map((day, idx) => {
  const drivesOnDay = day ? getDrivesForDate(day) : [];
  const isTodayDate = day && isToday(day);
  const isSelected = selectedDate && day === selectedDate.getDate() && 
                    currentMonth.getMonth() === selectedDate.getMonth() &&
                    currentMonth.getFullYear() === selectedDate.getFullYear();
  
  return (
    <div
      key={idx}
      onClick={() => {
        if (day) {
          setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
        }
      }}
      onMouseLeave={() => {
        // Reset to today's date when mouse leaves any date
        const today = new Date();
        if (currentMonth.getMonth() === today.getMonth() && 
            currentMonth.getFullYear() === today.getFullYear()) {
          setSelectedDate(today);
        }
      }}
      style={{
        padding: '6px 0',
        borderRadius: '5px',
        fontSize: '11px',
        background: day && (isTodayDate || isSelected)
          ? colors.primary 
          : 'transparent',
        color: day && (isTodayDate || isSelected) ? '#fff' : day ? colors.text : colors.textMuted,
        opacity: day ? 1 : 0.3,
        fontWeight: day && (isTodayDate || isSelected) ? '600' : '400',
        position: 'relative',
        cursor: day ? 'pointer' : 'default',
        transition: 'all 0.2s'
      }}
    >
      {day}
      {day && hasEvent(day) && (
        <div style={{
          position: 'absolute',
          bottom: '2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: (isTodayDate || isSelected) ? '#fff' : colors.primary
        }} />
      )}
      {day && drivesOnDay.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#ef4444',
          fontSize: '7px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700'
        }}>
          {drivesOnDay.length}
        </div>
      )}
    </div>
  );
})}
  </div>

  <div style={{
    borderTop: `1px solid ${colors.border}`,
    paddingTop: '10px',
    marginTop: '10px'
  }}>
    {selectedDate ? (
      <>
        <h5 style={{ 
          fontSize: '10px',
          fontWeight: '600', 
          color: colors.textMuted, 
          marginBottom: '8px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0'
        }}>
          Events on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </h5>
        {getDrivesForDate(selectedDate.getDate()).length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {getDrivesForDate(selectedDate.getDate()).map((drive) => (
              <div
                key={drive.id}
                style={{
                  padding: '8px',
                  background: colors.background,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${colors.primary}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => {
                  setSelectedDrive(drive);
                  setDetailsModalOpen(true);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.background;
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '600', color: colors.text, marginBottom: '3px' }}>
                  {drive.company} - {drive.role}
                </div>
                <div style={{ fontSize: '10px', color: colors.textMuted }}>
                  Application Deadline
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '16px',
            textAlign: 'center',
            color: colors.textMuted,
            fontSize: '12px'
          }}>
            No drive deadlines on this date
          </div>
        )}
      </>
    ) : (
      <>
        <h5 style={{ 
          fontSize: '10px',
          fontWeight: '600', 
          color: colors.textMuted, 
          marginBottom: '8px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0'
        }}>
          Today - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </h5>
        {getDrivesForDate(new Date().getDate()).length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {getDrivesForDate(new Date().getDate()).map((drive) => (
              <div
                key={drive.id}
                style={{
                  padding: '8px',
                  background: colors.background,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${colors.primary}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => {
                  setSelectedDrive(drive);
                  setDetailsModalOpen(true);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.background;
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '600', color: colors.text, marginBottom: '3px' }}>
                  {drive.company} - {drive.role}
                </div>
                <div style={{ fontSize: '10px', color: colors.textMuted }}>
                  Application Deadline
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '16px',
            textAlign: 'center',
            color: colors.textMuted,
            fontSize: '12px'
          }}>
            No drive deadlines today
          </div>
        )}
      </>
    )}
  </div>
</div>
      {/* Application Confirmation Modal */}
      {/* Application Confirmation Modal */}
{applicationModalOpen && applyingDrive && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 300,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '80px 20px 20px 20px',
      overflowY: 'auto'
    }}
    onClick={() => setApplicationModalOpen(false)}
  >
    <div
      style={{
        background: colors.card,
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
    >
            {/* Header */}
            <div style={{
              padding: '24px 32px',
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button
                onClick={() => setApplicationModalOpen(false)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '50%',
                  background: colors.card,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.iconColor,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.background;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.card;
                }}
              >
                <Icons.ArrowLeftIcon width={20} height={20} />
              </button>
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text }}>
                  Confirm Your Application
                </h1>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: colors.textMuted }}>
                  Please review your details before submitting.
                </p>
              </div>
            </div>

            {/* Body - Scrollable */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 400px',
                gap: '32px'
              }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Candidate Details Card */}
                  <div style={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '16px 24px',
                      borderBottom: `1px solid ${colors.border}`,
                      fontSize: '16px',
                      fontWeight: '700',
                      color: colors.text
                    }}>
                      Candidate Details
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0',
                      padding: '24px'
                    }}>
                      <div style={{ padding: '16px 8px 16px 0', borderBottom: `1px solid ${colors.border}` }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: colors.textMuted }}>Name</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: colors.text }}>John Doe</p>
                      </div>
                      <div style={{ padding: '16px 0 16px 8px', borderBottom: `1px solid ${colors.border}` }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: colors.textMuted }}>Email</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: colors.text }}>john.doe@example.com</p>
                      </div>
                      <div style={{ padding: '16px 8px 16px 0', borderBottom: `1px solid ${colors.border}` }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: colors.textMuted }}>Phone</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: colors.text }}>+1 123-456-7890</p>
                      </div>
                      <div style={{ padding: '16px 0 16px 8px', borderBottom: `1px solid ${colors.border}` }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: colors.textMuted }}>College</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: colors.text }}>University of Technology</p>
                      </div>
                      <div style={{ padding: '16px 8px 16px 0' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: colors.textMuted }}>Department</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: colors.text }}>Computer Science</p>
                      </div>
                      <div style={{ padding: '16px 0 16px 8px' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: colors.textMuted }}>CGPA</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: colors.text }}>8.5</p>
                      </div>
                    </div>
                    <div style={{
                      padding: '12px 24px',
                      borderTop: `1px solid ${colors.border}`
                    }}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: colors.primary,
                          textDecoration: 'underline'
                        }}
                      >
                        Edit in Profile
                      </a>
                    </div>
                  </div>

                  {/* Resume Section */}
                  <div style={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '16px 24px',
                      borderBottom: `1px solid ${colors.border}`,
                      fontSize: '16px',
                      fontWeight: '700',
                      color: colors.text
                    }}>
                      Resume
                    </div>
                    <div style={{
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          background: colors.background,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.iconColor
                        }}>
                          <Icons.FileTextIcon width={24} height={24} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                            john_doe_resume_2024.pdf
                          </p>
                          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: colors.textMuted }}>
                            Last updated: 2 days ago
                          </p>
                        </div>
                      </div>
                      <button
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: `1px solid ${colors.border}`,
                          background: colors.card,
                          color: colors.text,
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '600',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.background;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = colors.card;
                        }}
                      >
                        Change Resume
                      </button>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div style={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    padding: '24px'
                  }}>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: '8px'
                      }}>
                        Preferred Interview Mode (Optional)
                      </label>
                      <select
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: `1px solid ${colors.border}`,
                          background: colors.card,
                          color: colors.text,
                          fontSize: '14px',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option>No Preference</option>
                        <option>Online</option>
                        <option>In-person</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <input
                        type="checkbox"
                        id="agreement"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginTop: '2px',
                          cursor: 'pointer',
                          accentColor: colors.primary
                        }}
                      />
                      <label
                        htmlFor="agreement"
                        style={{
                          fontSize: '13px',
                          color: colors.text,
                          lineHeight: '1.5',
                          cursor: 'pointer'
                        }}
                      >
                        I agree to share my details with the recruiter for this role.
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Job Summary */}
                <div>
                  <div style={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    padding: '24px',
                    position: 'sticky',
                    top: '20px'
                  }}>
                    <h3 style={{
                      margin: '0 0 20px 0',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: colors.text
                    }}>
                      Job Summary
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: colors.background,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: colors.primary,
                        flexShrink: 0
                      }}>
                        {applyingDrive.company.charAt(0)}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text }}>
                          {applyingDrive.company}
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: colors.textMuted }}>
                          {applyingDrive.role}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      padding: '20px 0',
                      borderTop: `1px solid ${colors.border}`,
                      borderBottom: `1px solid ${colors.border}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icons.GlobeIcon width={18} height={18} style={{ color: colors.iconColor }} />
                        <span style={{ fontSize: '13px', color: colors.textMuted }}>{applyingDrive.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icons.ValueIcon width={18} height={18} style={{ color: colors.iconColor }} />
                        <span style={{ fontSize: '13px', color: colors.textMuted }}>{applyingDrive.ctc}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icons.CalendarIcon width={18} height={18} style={{ color: colors.iconColor }} />
                        <span style={{ fontSize: '13px', color: colors.textMuted }}>
                          Apply by {new Date(applyingDrive.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      marginTop: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: `${colors.primary}20`,
                        color: colors.primary
                      }}>
                        Actively Hiring
                      </span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setApplicationModalOpen(false);
                          setSelectedDrive(applyingDrive);
                          setDetailsModalOpen(true);
                        }}
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: colors.primary,
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        View Job Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px 32px',
              borderTop: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              background: colors.card
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>
                You are applying to <strong style={{ color: colors.text }}>{applyingDrive.company}</strong> as a{' '}
                <strong style={{ color: colors.text }}>{applyingDrive.role}</strong>.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setApplicationModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: `1px solid ${colors.border}`,
                    background: colors.card,
                    color: colors.text,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.background;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.card;
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: colors.primary,
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.primaryDark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.primary;
                  }}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
            

            {/* Summary - LARGER */}
            <div style={{
              background: colors.card,
              borderRadius: '10px',
              border: `1px solid ${colors.border}`,
              padding: '14px',
              boxShadow: colors.shadow
            }}>
              <h4 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '13px', margin: '0 0 12px 0', color: colors.text }}>Summary</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}>
                {[
                  { label: 'Total Drives', value: '50', icon: Icons.ListBulletIcon },
                  { label: 'Applied', value: '5', icon: Icons.CheckCircledIcon },
                  { label: 'Offered', value: '1', icon: Icons.StarIcon },
                  { label: 'Companies', value: '23', icon: Icons.BarChartIcon }
                ].map((stat) => (
                  <div key={stat.label} style={{ 
                    padding: '12px',
                    background: colors.background, 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      fontSize: '10px',
                      color: colors.textMuted, 
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      <stat.icon width={11} height={11} style={{ color: colors.iconColor }} />
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '700', color: colors.text }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      )}
            {/* Drive Details Modal */}
      {detailsModalOpen && selectedDrive && (
        <>
          {/* Modal Overlay */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setDetailsModalOpen(false)}
          >
            {/* Modal Content */}
            <div
              style={{
                background: colors.card,
                borderRadius: '20px',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '85vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                padding: '24px 32px',
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: colors.background,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: '700',
                  color: colors.primary,
                  border: `2px solid ${colors.border}`
                }}>
                  {selectedDrive.company.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text }}>
                    {selectedDrive.company}
                  </h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: colors.textMuted }}>
                    {selectedDrive.role}
                  </p>
                </div>
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '8px',
                    background: colors.background,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.iconColor,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.border;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.background;
                  }}
                >
                  <Icons.Cross2Icon width={20} height={20} />
                </button>
              </div>

              {/* Info Cards */}
              <div style={{
                padding: '24px 32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                borderBottom: `1px solid ${colors.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${colors.primary}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.primary
                  }}>
                    <Icons.ValueIcon width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>CTC</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: colors.text }}>{selectedDrive.ctc}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${colors.primary}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.primary
                  }}>
                    <Icons.GlobeIcon width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>Location</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: colors.text }}>{selectedDrive.location}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${colors.primary}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.primary
                  }}>
                    <Icons.PersonIcon width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>Eligibility</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: colors.text }}>CSE/IT, 7.0 CGPA</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${colors.primary}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.primary
                  }}>
                    <Icons.CalendarIcon width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>Batch</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: colors.text }}>2024</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{
                padding: '0 32px',
                display: 'flex',
                gap: '32px',
                borderBottom: `1px solid ${colors.border}`
              }}>
                {['Job Description', 'Recruitment Process', 'Attachments'].map((tab, idx) => (
                  <button
                    key={tab}
                    style={{
                      padding: '16px 0',
                      border: 'none',
                      background: 'transparent',
                      color: idx === 0 ? colors.primary : colors.textMuted,
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      borderBottom: idx === 0 ? `2px solid ${colors.primary}` : '2px solid transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Modal Body - Scrollable */}
              <div style={{
                flex: 1,
                padding: '24px 32px',
                overflowY: 'auto'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.6', color: colors.text }}>
                    As a {selectedDrive.role} at {selectedDrive.company}, you will be a part of a dynamic team that is responsible
                    for building cutting-edge software solutions. You will work on the entire software development lifecycle, from
                    conception and design to testing and deployment.
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '700', color: colors.text }}>
                    Responsibilities:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text }}>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Design, develop, and maintain high-quality, scalable web applications.
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Collaborate with cross-functional teams to define, design, and ship new features.
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Write clean, efficient, and well-documented code.
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Troubleshoot and debug applications to optimize performance.
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Participate in code reviews to maintain high-quality code standards.
                    </li>
                  </ul>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '700', color: colors.text }}>
                    Requirements:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text }}>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Bachelor's degree in Computer Science or related field
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Strong problem-solving skills and attention to detail
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                      Excellent communication and teamwork abilities
                    </li>
                  </ul>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '700', color: colors.text }}>
                    Required Skills:
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedDrive.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          background: colors.background,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          fontWeight: '500'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '20px 32px',
                borderTop: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: colors.primary,
                    fontSize: '14px',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  Contact Placement Officer
                </a>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {selectedDrive.status === 'Applied' && (
                    <button
                      style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`,
                        background: colors.card,
                        color: colors.text,
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.background;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.card;
                      }}
                    >
                      Withdraw Application
                    </button>
                  )}

                 <button
  disabled={selectedDrive.status !== 'Eligible'}
  onClick={() => {
    if (selectedDrive.status === 'Eligible') {
      setDetailsModalOpen(false);
      setApplyingDrive(selectedDrive);
      setApplicationModalOpen(true);
    }
  }}
  style={{
    padding: '12px 32px',
    borderRadius: '8px',
    border: 'none',
    background: selectedDrive.status === 'Eligible' ? colors.primary : colors.border,
    color: '#fff',
    cursor: selectedDrive.status === 'Eligible' ? 'pointer' : 'not-allowed',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => {
    if (selectedDrive.status === 'Eligible') {
      e.currentTarget.style.background = colors.primaryDark;
    }
  }}
  onMouseLeave={(e) => {
    if (selectedDrive.status === 'Eligible') {
      e.currentTarget.style.background = colors.primary;
    }
  }}
>
  {selectedDrive.status === 'Applied' ? 'Applied' : selectedDrive.status === 'Offered' ? 'Offered' : 'Apply Now'}
</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}