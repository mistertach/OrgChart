import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Header from "./layout/Header";
import DirectoryView from "./directory/DirectoryView";
import OrgChartView from "./orgchart/OrgChartView";
import EmployeeProfileModal from "./employee/EmployeeProfileModal";
import ProfilePage from "./employee/ProfilePage";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Mock employee data for the profile modal
  const employeeData = {
    id: "1",
    name: "Ahmed Al-Saud",
    jobTitle: "Senior Petroleum Engineer",
    department: "Upstream Operations",
    email: "ahmed.alsaud@aramco.com",
    phone: "+966 50 123 4567",
    location: "Dhahran, Saudi Arabia",
    timeZone: "AST (GMT+3)",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    bio: "Experienced petroleum engineer with 10+ years in upstream operations. Specialized in reservoir management and enhanced oil recovery techniques.",
    currentRole:
      "Leading a team of engineers focused on optimizing production from mature fields using advanced recovery methods. Currently working on the Ghawar field optimization project.",
    skills: [
      "Reservoir Engineering",
      "Enhanced Oil Recovery",
      "Well Testing",
      "Petrel",
      "Eclipse",
      "Production Optimization",
      "Field Development Planning",
    ],
    interests: [
      "Renewable Energy Integration",
      "Carbon Capture",
      "Sustainable Development",
      "Desert Hiking",
      "Photography",
    ],
    languages: ["Arabic (Native)", "English (Fluent)", "French (Basic)"],
    projects: [
      {
        name: "Ghawar Field Optimization",
        role: "Lead Engineer",
        period: "Jan 2023 - Present",
      },
      {
        name: "Khurais Smart Field Implementation",
        role: "Senior Engineer",
        period: "Mar 2020 - Dec 2022",
      },
      {
        name: "Manifa Reservoir Characterization",
        role: "Reservoir Engineer",
        period: "Jun 2018 - Feb 2020",
      },
    ],
    education: [
      {
        degree: "MSc, Petroleum Engineering",
        institution: "King Fahd University of Petroleum & Minerals",
        year: "2013",
      },
      {
        degree: "BSc, Petroleum Engineering",
        institution: "King Fahd University of Petroleum & Minerals",
        year: "2011",
      },
    ],
    certifications: [
      {
        name: "Certified Reservoir Engineer",
        issuer: "Society of Petroleum Engineers",
        year: "2015",
      },
      {
        name: "Advanced Well Testing",
        issuer: "Schlumberger",
        year: "2014",
      },
    ],
    reportingManagers: [
      {
        name: "Khalid Al-Falih",
        relationship: "Primary",
      },
      {
        name: "Nasser Al-Nafisee",
        relationship: "Dotted Line",
      },
    ],
    manager: {
      id: "2",
      name: "Khalid Al-Falih",
      jobTitle: "VP of Upstream Operations",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=khalid",
    },
    directReports: [
      {
        id: "3",
        name: "Fatima Al-Zahrani",
        jobTitle: "Reservoir Engineer",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
      },
      {
        id: "4",
        name: "Omar Al-Qahtani",
        jobTitle: "Production Engineer",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
      },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/ahmedalsaud",
      twitter: "https://twitter.com/ahmedalsaud",
      github: "",
    },
    startDate: "March 15, 2013",
    isFavorite: false,
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply the dark mode class to the document
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would filter employees based on the query
    console.log(`Searching for: ${query}`);
  };

  const handleViewProfile = (id: string) => {
    setSelectedEmployee(id);
    setProfileModalOpen(true);
  };

  const handleToggleFavorite = (id: string) => {
    // In a real app, you would update the favorite status in your data store
    console.log(`Toggling favorite status for employee ${id}`);
  };

  return (
    <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
      <Header
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 py-6">
        <Tabs
          defaultValue="directory"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="directory">Employee Directory</TabsTrigger>
            <TabsTrigger value="orgchart">Org Chart</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="h-[calc(100vh-220px)]">
            <DirectoryView
              onViewProfile={handleViewProfile}
              onToggleFavorite={handleToggleFavorite}
            />
          </TabsContent>

          <TabsContent value="orgchart" className="h-[calc(100vh-220px)]">
            <OrgChartView />
          </TabsContent>

          <TabsContent value="profile" className="h-[calc(100vh-220px)]">
            <ProfilePage />
          </TabsContent>
        </Tabs>
      </main>

      <EmployeeProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        employee={employeeData}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default Home;
