import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Edit, Save, X } from "lucide-react";
import EmployeeProfileForm from "./EmployeeProfileForm";
import EmployeeProfileModal from "./EmployeeProfileModal";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [profileData, setProfileData] = useState({
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
  });

  const handleSaveProfile = (data: any) => {
    setProfileData({
      ...profileData,
      ...data,
    });
    setIsEditing(false);
    // In a real app, you would save this to your backend
    console.log("Saving profile data:", data);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewOpen(true)}>
            Preview Profile
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      {isEditing ? (
        <EmployeeProfileForm
          initialData={profileData}
          onSave={handleSaveProfile}
        />
      ) : (
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 border-2 border-primary/10">
                  <AvatarImage
                    src={profileData.profileImage}
                    alt={profileData.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">
                    {profileData.jobTitle}
                  </p>
                  <Badge className="mt-2">{profileData.department}</Badge>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="work">Work</TabsTrigger>
                    <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
                    <TabsTrigger value="education">
                      Education & Certs
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="pt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bio</h3>
                      <p className="text-muted-foreground">{profileData.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Contact Information
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <span className="font-medium">Email:</span>{" "}
                            {profileData.email}
                          </li>
                          <li>
                            <span className="font-medium">Phone:</span>{" "}
                            {profileData.phone}
                          </li>
                          <li>
                            <span className="font-medium">Location:</span>{" "}
                            {profileData.location}
                          </li>
                          <li>
                            <span className="font-medium">Time Zone:</span>{" "}
                            {profileData.timeZone}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.languages.map((language, index) => (
                            <Badge key={index} variant="secondary">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="work" className="pt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Current Role & Responsibilities
                      </h3>
                      <p className="text-muted-foreground">
                        {profileData.currentRole}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Reporting Structure
                      </h3>
                      <div className="space-y-2">
                        {profileData.reportingManagers.map((manager, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge
                              variant={
                                manager.relationship === "Primary"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {manager.relationship}
                            </Badge>
                            <span>{manager.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Projects</h3>
                      <div className="space-y-3">
                        {profileData.projects.map((project, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <p className="font-medium">{project.name}</p>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>{project.role}</span>
                              <span>{project.period}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="pt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Professional Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Personal Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="pt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Education</h3>
                      <div className="space-y-3">
                        {profileData.education.map((edu, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution}, {edu.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Certifications
                      </h3>
                      <div className="space-y-3">
                        {profileData.certifications.map((cert, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {cert.issuer}, {cert.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <EmployeeProfileModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        employee={profileData}
      />
    </div>
  );
};

export default ProfilePage;
