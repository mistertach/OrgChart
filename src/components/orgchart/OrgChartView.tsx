import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  ZoomIn,
  ZoomOut,
  Plus,
  Minus,
  Home,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Mail,
  Calendar,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  imageUrl: string;
  email: string;
  directReports?: Employee[];
}

interface OrgNodeProps {
  employee: Employee;
  level?: number;
  expanded?: boolean;
  onToggle?: (id: string) => void;
  onSelect?: (employee: Employee) => void;
}

const OrgNode: React.FC<OrgNodeProps> = ({
  employee,
  level = 0,
  expanded = true,
  onToggle = () => {},
  onSelect = () => {},
}) => {
  const hasChildren =
    employee.directReports && employee.directReports.length > 0;

  return (
    <div className="flex flex-col items-center">
      <Card
        className="w-64 p-4 mb-2 bg-white border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onSelect(employee)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                employee.imageUrl ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.id}`
              }
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{employee.name}</h4>
            <p className="text-xs text-gray-500 truncate">{employee.title}</p>
            <p className="text-xs text-gray-400 truncate">
              {employee.department}
            </p>
          </div>
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(employee.id);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </Card>

      {hasChildren && expanded && (
        <div className="relative pt-6">
          {/* Vertical line from parent to children */}
          <div className="absolute top-0 left-1/2 w-px h-6 bg-gray-400"></div>

          {/* Container for children nodes */}
          <div className="flex flex-col items-center gap-10">
            {/* If there are multiple children, draw a horizontal line */}
            {employee.directReports && employee.directReports.length > 1 && (
              <div className="relative w-full">
                <div className="absolute top-0 left-0 right-0 h-px bg-gray-400"></div>
              </div>
            )}

            {/* Render each child node */}
            {employee.directReports?.map((report, index) => (
              <div key={report.id} className="relative">
                {/* Vertical line to each child */}
                {employee.directReports &&
                  employee.directReports.length > 1 && (
                    <div className="absolute top-[-10px] left-1/2 w-px h-10 bg-gray-400"></div>
                  )}
                <OrgNode
                  employee={report}
                  level={level + 1}
                  expanded={expandedNodes[report.id] ?? expanded}
                  onToggle={onToggle}
                  onSelect={onSelect}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface OrgChartViewProps {
  initialData?: Employee;
}

const OrgChartView: React.FC<OrgChartViewProps> = ({ initialData }) => {
  const [zoom, setZoom] = useState(100);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    ceo: true,
    coo: true,
    cfo: true,
    "vp-upstream": true,
    "vp-downstream": false,
    "vp-treasury": false,
    "vp-technology": false,
    "vp-hr": false,
    "dir-reservoir": false,
    "dir-drilling": false,
    "dir-refining": false,
    "dir-digital": false,
  });
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  // Mock data if none provided
  const mockData: Employee = initialData || {
    id: "ceo",
    name: "Amin H. Nasser",
    title: "President & CEO",
    department: "Executive",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=amin",
    email: "amin.nasser@aramco.com",
    directReports: [
      {
        id: "coo",
        name: "Mohammed Y. Al Qahtani",
        title: "Executive VP & COO",
        department: "Executive",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed",
        email: "mohammed.alqahtani@aramco.com",
        directReports: [
          {
            id: "vp-upstream",
            name: "Khalid Al-Falih",
            title: "VP of Upstream Operations",
            department: "Upstream Operations",
            imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=khalid",
            email: "khalid.alfalih@aramco.com",
            directReports: [
              {
                id: "dir-reservoir",
                name: "Nasser Al-Nafisee",
                title: "Director of Reservoir Management",
                department: "Upstream Operations",
                imageUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=nasser",
                email: "nasser.alnafisee@aramco.com",
                directReports: [
                  {
                    id: "senior-petroleum",
                    name: "Ahmed Al-Saud",
                    title: "Senior Petroleum Engineer",
                    department: "Upstream Operations",
                    imageUrl:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
                    email: "ahmed.alsaud@aramco.com",
                    directReports: [
                      {
                        id: "reservoir-eng-1",
                        name: "Fatima Al-Zahrani",
                        title: "Reservoir Engineer",
                        department: "Upstream Operations",
                        imageUrl:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
                        email: "fatima.alzahrani@aramco.com",
                      },
                      {
                        id: "production-eng-1",
                        name: "Omar Al-Qahtani",
                        title: "Production Engineer",
                        department: "Production Operations",
                        imageUrl:
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
                        email: "omar.alqahtani@aramco.com",
                      },
                    ],
                  },
                ],
              },
              {
                id: "dir-drilling",
                name: "Saad Al-Ghamdi",
                title: "Director of Drilling Operations",
                department: "Drilling Operations",
                imageUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=saad",
                email: "saad.alghamdi@aramco.com",
              },
            ],
          },
          {
            id: "vp-downstream",
            name: "Abdullah Al-Baiz",
            title: "VP of Downstream Operations",
            department: "Downstream Operations",
            imageUrl:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=abdullah",
            email: "abdullah.albaiz@aramco.com",
            directReports: [
              {
                id: "dir-refining",
                name: "Ibrahim Al-Buainain",
                title: "Director of Refining",
                department: "Downstream Operations",
                imageUrl:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=ibrahim",
                email: "ibrahim.albuainain@aramco.com",
              },
            ],
          },
        ],
      },
      {
        id: "cfo",
        name: "Ziad Al-Murshed",
        title: "Executive VP & CFO",
        department: "Finance",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ziad",
        email: "ziad.almurshed@aramco.com",
        directReports: [
          {
            id: "vp-treasury",
            name: "Khalid Al-Dabbagh",
            title: "VP of Treasury",
            department: "Finance",
            imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=khalid2",
            email: "khalid.aldabbagh@aramco.com",
          },
        ],
      },
      {
        id: "vp-technology",
        name: "Ahmad Al-Khowaiter",
        title: "Chief Technology Officer",
        department: "Technology & Innovation",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
        email: "ahmad.alkhowaiter@aramco.com",
        directReports: [
          {
            id: "dir-digital",
            name: "Aisha Al-Shamsi",
            title: "Director of Digital Transformation",
            department: "Digital Transformation",
            imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
            email: "aisha.alshamsi@aramco.com",
          },
        ],
      },
      {
        id: "vp-hr",
        name: "Nabeel Al-Jama",
        title: "VP of Human Resources",
        department: "Human Resources",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=nabeel",
        email: "nabeel.aljama@aramco.com",
      },
    ],
  };

  const handleToggleNode = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <h2 className="text-xl font-semibold">Organization Chart</h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={zoom <= 50}
                >
                  <Minus size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="w-32">
            <Slider
              value={[zoom]}
              min={50}
              max={150}
              step={10}
              onValueChange={(value) => setZoom(value[0])}
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={zoom >= 150}
                >
                  <Plus size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleResetZoom}>
                  <Home size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div
          className="flex justify-center"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <OrgNode
            employee={mockData}
            expanded={expandedNodes[mockData.id] ?? true}
            onToggle={handleToggleNode}
            onSelect={handleSelectEmployee}
          />
        </div>
      </div>

      {selectedEmployee && (
        <div className="border-t bg-white p-4">
          <div className="flex items-start gap-4">
            <img
              src={
                selectedEmployee.imageUrl ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedEmployee.id}`
              }
              alt={selectedEmployee.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-medium">{selectedEmployee.name}</h3>
              <p className="text-sm text-gray-600">{selectedEmployee.title}</p>
              <p className="text-sm text-gray-500">
                {selectedEmployee.department}
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <Mail size={14} />
                  <a href={`mailto:${selectedEmployee.email}`}>Email</a>
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Calendar size={14} />
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgChartView;
