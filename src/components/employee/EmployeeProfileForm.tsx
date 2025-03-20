import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Plus, X, Save } from "lucide-react";

interface EmployeeProfileFormProps {
  onSave?: (data: any) => void;
  initialData?: any;
}

const EmployeeProfileForm = ({
  onSave = () => {},
  initialData = {
    name: "",
    jobTitle: "",
    department: "",
    email: "",
    phone: "",
    location: "",
    timeZone: "",
    bio: "",
    currentRole: "",
    skills: [],
    interests: [],
    languages: [],
    education: [],
    certifications: [],
    reportingManagers: [],
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
    },
  },
}: EmployeeProfileFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
  });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  });
  const [newManager, setNewManager] = useState({
    name: "",
    relationship: "Primary", // Primary, Dotted Line, etc.
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s: string) => s !== skill),
    });
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !formData.interests.includes(newInterest.trim())
    ) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i: string) => i !== interest),
    });
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !formData.languages.includes(newLanguage.trim())
    ) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      });
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l: string) => l !== language),
    });
  };

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setFormData({
        ...formData,
        education: [...formData.education, { ...newEducation }],
      });
      setNewEducation({ degree: "", institution: "", year: "" });
    }
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_: any, i: number) => i !== index),
    });
  };

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, { ...newCertification }],
      });
      setNewCertification({ name: "", issuer: "", year: "" });
    }
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter(
        (_: any, i: number) => i !== index,
      ),
    });
  };

  const addManager = () => {
    if (newManager.name.trim()) {
      setFormData({
        ...formData,
        reportingManagers: [...formData.reportingManagers, { ...newManager }],
      });
      setNewManager({ name: "", relationship: "Primary" });
    }
  };

  const removeManager = (index: number) => {
    setFormData({
      ...formData,
      reportingManagers: formData.reportingManagers.filter(
        (_: any, i: number) => i !== index,
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Your Profile</h2>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personal Information</h3>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Your job title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Your department"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location & Availability</h3>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Your location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeZone">Time Zone</Label>
            <Input
              id="timeZone"
              name="timeZone"
              value={formData.timeZone}
              onChange={handleInputChange}
              placeholder="Your time zone"
            />
          </div>

          <h3 className="text-lg font-medium mt-6">Social Links</h3>

          <div className="space-y-2">
            <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
            <Input
              id="socialLinks.linkedin"
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn profile URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="socialLinks.twitter">Twitter</Label>
            <Input
              id="socialLinks.twitter"
              name="socialLinks.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleInputChange}
              placeholder="Twitter profile URL"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">About You</h3>

        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Write a short professional bio"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentRole">Current Role & Responsibilities</Label>
          <Textarea
            id="currentRole"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleInputChange}
            placeholder="Describe what you're currently working on"
            rows={4}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skills & Expertise</h3>

        <div className="flex flex-wrap gap-2 mb-2">
          {formData.skills.map((skill: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="flex-1"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
          />
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Interests</h3>

        <div className="flex flex-wrap gap-2 mb-2">
          {formData.interests.map((interest: string, index: number) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              {interest}
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            className="flex-1"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addInterest())
            }
          />
          <Button type="button" onClick={addInterest} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Languages</h3>

        <div className="flex flex-wrap gap-2 mb-2">
          {formData.languages.map((language: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {language}
              <button
                type="button"
                onClick={() => removeLanguage(language)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language (e.g. English - Native)"
            className="flex-1"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addLanguage())
            }
          />
          <Button type="button" onClick={addLanguage} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Reporting Structure</h3>
        <p className="text-sm text-muted-foreground">
          Add your reporting managers (primary and dotted line)
        </p>

        <div className="space-y-3">
          {formData.reportingManagers.map((manager: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <p className="font-medium">{manager.name}</p>
                <Badge
                  variant={
                    manager.relationship === "Primary" ? "default" : "outline"
                  }
                >
                  {manager.relationship} Manager
                </Badge>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeManager(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="md:col-span-3">
            <Input
              value={newManager.name}
              onChange={(e) =>
                setNewManager({ ...newManager, name: e.target.value })
              }
              placeholder="Manager's name"
            />
          </div>
          <div className="flex gap-2">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newManager.relationship}
              onChange={(e) =>
                setNewManager({ ...newManager, relationship: e.target.value })
              }
            >
              <option value="Primary">Primary</option>
              <option value="Dotted Line">Dotted Line</option>
              <option value="Project">Project</option>
            </select>
            <Button type="button" onClick={addManager} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Education</h3>

        <div className="space-y-3">
          {formData.education.map((edu: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}, {edu.year}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
            placeholder="Degree"
          />
          <Input
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institution: e.target.value })
            }
            placeholder="Institution"
          />
          <div className="flex gap-2">
            <Input
              value={newEducation.year}
              onChange={(e) =>
                setNewEducation({ ...newEducation, year: e.target.value })
              }
              placeholder="Year"
            />
            <Button type="button" onClick={addEducation} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Certifications</h3>

        <div className="space-y-3">
          {formData.certifications.map((cert: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <p className="font-medium">{cert.name}</p>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer}, {cert.year}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            value={newCertification.name}
            onChange={(e) =>
              setNewCertification({ ...newCertification, name: e.target.value })
            }
            placeholder="Certification name"
          />
          <Input
            value={newCertification.issuer}
            onChange={(e) =>
              setNewCertification({
                ...newCertification,
                issuer: e.target.value,
              })
            }
            placeholder="Issuing organization"
          />
          <div className="flex gap-2">
            <Input
              value={newCertification.year}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  year: e.target.value,
                })
              }
              placeholder="Year"
            />
            <Button type="button" onClick={addCertification} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EmployeeProfileForm;
