import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Users,
  Award,
  Briefcase,
  Star,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

interface EmployeeProfileModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  employee?: {
    id: string;
    name: string;
    jobTitle: string;
    department: string;
    email: string;
    phone: string;
    location: string;
    timeZone: string;
    profileImage: string;
    bio: string;
    skills: string[];
    languages: string[];
    projects: Array<{ name: string; role: string; period: string }>;
    education: Array<{ degree: string; institution: string; year: string }>;
    manager?: {
      id: string;
      name: string;
      jobTitle: string;
      profileImage: string;
    };
    directReports?: Array<{
      id: string;
      name: string;
      jobTitle: string;
      profileImage: string;
    }>;
    socialLinks?: { linkedin?: string; github?: string; twitter?: string };
    startDate: string;
    isFavorite: boolean;
  };
  onToggleFavorite?: (id: string) => void;
}

const EmployeeProfileModal = ({
  open = true,
  onOpenChange = () => {},
  employee = {
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
    skills: [
      "Reservoir Engineering",
      "Enhanced Oil Recovery",
      "Well Testing",
      "Petrel",
      "Eclipse",
      "Production Optimization",
      "Field Development Planning",
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
    currentRole:
      "Leading a team of engineers focused on optimizing production from mature fields using advanced recovery methods. Currently working on the Ghawar field optimization project.",
    interests: [
      "Renewable Energy Integration",
      "Carbon Capture",
      "Sustainable Development",
      "Desert Hiking",
      "Photography",
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
  },
  onToggleFavorite = () => {},
}: EmployeeProfileModalProps) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);

  const displayedSkills = showAllSkills
    ? employee.skills
    : employee.skills.slice(0, 5);
  const displayedReports = showAllReports
    ? employee.directReports
    : employee.directReports?.slice(0, 3);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/10">
                <AvatarImage src={employee.profileImage} alt={employee.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  {employee.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-1"
                    onClick={() => onToggleFavorite(employee.id)}
                  >
                    <Star
                      className={
                        employee.isFavorite
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }
                      size={18}
                    />
                  </Button>
                </DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {employee.jobTitle}
                </DialogDescription>
                <Badge variant="secondary" className="mt-2">
                  {employee.department}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`mailto:${employee.email}`)}
              >
                <Mail size={14} className="mr-1" />
                Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`calendar:${employee.email}`)}
              >
                <Calendar size={14} className="mr-1" />
                Schedule
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="projects">Projects & Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{employee.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayedSkills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 5 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setShowAllSkills(!showAllSkills)}
                      >
                        {showAllSkills ? (
                          <>
                            <ChevronUp size={14} className="mr-1" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} className="mr-1" />+
                            {employee.skills.length - 5} More
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.languages.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <div className="space-y-3">
                    {employee.education.map((edu, index) => (
                      <div key={index}>
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-muted-foreground">
                          {edu.institution}, {edu.year}
                        </div>
                        {index < employee.education.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <a
                        href={`mailto:${employee.email}`}
                        className="text-sm hover:underline"
                      >
                        {employee.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <a
                        href={`tel:${employee.phone}`}
                        className="text-sm hover:underline"
                      >
                        {employee.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span className="text-sm">{employee.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span className="text-sm">{employee.timeZone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Company Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-muted-foreground" />
                      <span className="text-sm">
                        Started {employee.startDate}
                      </span>
                    </div>
                  </div>
                </div>

                {employee.socialLinks &&
                  Object.values(employee.socialLinks).some((link) => link) && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Social Profiles
                      </h3>
                      <div className="flex gap-2">
                        {employee.socialLinks.linkedin && (
                          <Button variant="outline" size="icon" asChild>
                            <a
                              href={employee.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin size={18} />
                            </a>
                          </Button>
                        )}
                        {employee.socialLinks.github && (
                          <Button variant="outline" size="icon" asChild>
                            <a
                              href={employee.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github size={18} />
                            </a>
                          </Button>
                        )}
                        {employee.socialLinks.twitter && (
                          <Button variant="outline" size="icon" asChild>
                            <a
                              href={employee.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twitter size={18} />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="pt-4">
            <div className="space-y-6">
              {employee.manager && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Manager</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer">
                    <Avatar>
                      <AvatarImage
                        src={employee.manager.profileImage}
                        alt={employee.manager.name}
                      />
                      <AvatarFallback>
                        {employee.manager.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.manager.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {employee.manager.jobTitle}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {employee.directReports && employee.directReports.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Direct Reports ({employee.directReports.length})
                  </h3>
                  <div className="space-y-2">
                    {displayedReports?.map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage
                            src={report.profileImage}
                            alt={report.name}
                          />
                          <AvatarFallback>
                            {report.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {report.jobTitle}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <ExternalLink size={16} />
                        </Button>
                      </div>
                    ))}

                    {employee.directReports.length > 3 && (
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setShowAllReports(!showAllReports)}
                      >
                        {showAllReports
                          ? "Show Less"
                          : `Show All ${employee.directReports.length} Reports`}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Projects</h3>
                <div className="space-y-4">
                  {employee.projects.map((project, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="font-medium text-lg">{project.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {project.role}
                      </div>
                      <Badge variant="outline">{project.period}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeProfileModal;
