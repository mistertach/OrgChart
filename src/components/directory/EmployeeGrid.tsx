import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pagination } from "../ui/pagination";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  timeZone: string;
  profileImage: string;
  skills: string[];
  isFavorite: boolean;
}

interface EmployeeGridProps {
  employees?: Employee[];
  onViewProfile?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isLoading?: boolean;
}

const EmployeeGrid = ({
  employees = [
    {
      id: "1",
      name: "Ahmed Al-Saud",
      jobTitle: "Senior Petroleum Engineer",
      department: "Upstream Operations",
      email: "ahmed.alsaud@aramco.com",
      phone: "+966 50 123 4567",
      location: "Dhahran, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
      skills: [
        "Reservoir Engineering",
        "Enhanced Oil Recovery",
        "Well Testing",
      ],
      isFavorite: true,
    },
    {
      id: "2",
      name: "Fatima Al-Zahrani",
      jobTitle: "Drilling Engineer",
      department: "Drilling Operations",
      email: "fatima.alzahrani@aramco.com",
      phone: "+966 50 987 6543",
      location: "Dammam, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
      skills: ["Drilling Optimization", "Well Planning", "Mud Engineering"],
      isFavorite: false,
    },
    {
      id: "3",
      name: "Mohammed Al-Qahtani",
      jobTitle: "Process Engineer",
      department: "Downstream Operations",
      email: "mohammed.alqahtani@aramco.com",
      phone: "+966 55 456 7890",
      location: "Jubail, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
      skills: ["Process Optimization", "Refinery Operations", "HAZOP"],
      isFavorite: false,
    },
    {
      id: "4",
      name: "Khalid Al-Falih",
      jobTitle: "VP of Upstream Operations",
      department: "Executive Leadership",
      email: "khalid.alfalih@aramco.com",
      phone: "+966 50 234 5678",
      location: "Riyadh, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=khalid",
      skills: ["Strategic Planning", "Reservoir Management", "Leadership"],
      isFavorite: true,
    },
    {
      id: "5",
      name: "Noura Al-Otaibi",
      jobTitle: "Environmental Specialist",
      department: "HSE",
      email: "noura.alotaibi@aramco.com",
      phone: "+966 55 345 6789",
      location: "Dhahran, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=noura",
      skills: [
        "Environmental Impact Assessment",
        "Compliance",
        "Sustainability",
      ],
      isFavorite: false,
    },
    {
      id: "6",
      name: "Omar Al-Qahtani",
      jobTitle: "Production Engineer",
      department: "Production Operations",
      email: "omar.alqahtani@aramco.com",
      phone: "+966 50 567 8901",
      location: "Abqaiq, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
      skills: ["Production Optimization", "Artificial Lift", "Well Monitoring"],
      isFavorite: false,
    },
    {
      id: "7",
      name: "Layla Al-Harbi",
      jobTitle: "Geologist",
      department: "Exploration",
      email: "layla.alharbi@aramco.com",
      phone: "+966 55 678 9012",
      location: "Dhahran, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=layla",
      skills: [
        "Seismic Interpretation",
        "Reservoir Characterization",
        "Petrel",
      ],
      isFavorite: false,
    },
    {
      id: "8",
      name: "Saad Al-Ghamdi",
      jobTitle: "Project Manager",
      department: "Projects & Engineering",
      email: "saad.alghamdi@aramco.com",
      phone: "+966 50 789 0123",
      location: "Yanbu, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=saad",
      skills: ["Project Management", "EPC Contracts", "Risk Assessment"],
      isFavorite: true,
    },
    {
      id: "9",
      name: "Aisha Al-Shamsi",
      jobTitle: "Data Scientist",
      department: "Digital Transformation",
      email: "aisha.alshamsi@aramco.com",
      phone: "+966 55 890 1234",
      location: "Dhahran, Saudi Arabia",
      timeZone: "AST (GMT+3)",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
      skills: ["Machine Learning", "Predictive Analytics", "Python"],
      isFavorite: false,
    },
  ],
  onViewProfile = () => {},
  onToggleFavorite = () => {},
  isLoading = false,
}: EmployeeGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9;

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-6 overflow-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Employee Directory</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[220px] bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2">No employees found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                id={employee.id}
                name={employee.name}
                jobTitle={employee.jobTitle}
                department={employee.department}
                email={employee.email}
                phone={employee.phone}
                location={employee.location}
                timeZone={employee.timeZone}
                profileImage={employee.profileImage}
                skills={employee.skills}
                isFavorite={employee.isFavorite}
                onViewProfile={onViewProfile}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeGrid;
