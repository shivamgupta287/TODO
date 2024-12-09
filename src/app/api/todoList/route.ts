import { NextRequest, NextResponse } from "next/server";

interface Task {
  id: string;
  type: string;
  title: string;
  status: string;
  priority: string;
}

const tasks: Task[] = [
  {
    id: "TASK-1001",
    type: "Feature",
    title: "Backing up the driver won't do anything, we need to parse the redundant protocol!",
    status: "Done", 
    priority: "Medium",
  },
  {
    id: "TASK-1002",
    type: "Documentation",
    title: "Backing up the pixel won't do anything, we need to transmit the primary IB protocol!",
    status: "In Progress",
    priority: "Low",
  },
  {
    id: "TASK-1003",
    type: "Bug",
    title: "The SQL interface is down, we need to compress the virtual JSON array!",
    status: "Backlog",
    priority: "High",
  },
  {
    id: "TASK-1004",
    type: "Feature",
    title: "We need to program the auxiliary USB protocol!",
    status: "In Progress", 
    priority: "Medium",
  },
  {
    id: "TASK-1005",
    type: "Documentation",
    title: "Documenting the wireless API implementation guidelines",
    status: "Done",
    priority: "Low",
  },
  {
    id: "TASK-1006",
    type: "Bug",
    title: "Fix memory leak in the neural network training module",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1007",
    type: "Feature",
    title: "Implement real-time data synchronization across distributed systems",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1008",
    type: "Documentation",
    title: "Update deployment documentation for containerized environments",
    status: "Done",
    priority: "Medium",
  },
  {
    id: "TASK-1009",
    type: "Bug",
    title: "Debug authentication failure in OAuth implementation",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1010",
    type: "Feature",
    title: "Add support for WebSocket connections in the messaging service",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1011",
    type: "Documentation",
    title: "Create user guide for new analytics dashboard",
    status: "In Progress",
    priority: "Low",
  },
  {
    id: "TASK-1012",
    type: "Bug",
    title: "Fix cross-browser compatibility issues in the UI components",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1013",
    type: "Feature",
    title: "Implement multi-factor authentication system",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1014",
    type: "Documentation",
    title: "Document API endpoints for third-party integrations",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1015",
    type: "Bug",
    title: "Resolve database connection timeout issues",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1016",
    type: "Feature",
    title: "Add support for file encryption in storage service",
    status: "Done",
    priority: "Medium",
  },
  {
    id: "TASK-1017",
    type: "Documentation",
    title: "Create technical specification for new microservice architecture",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1018",
    type: "Bug",
    title: "Fix performance issues in data processing pipeline",
    status: "Backlog",
    priority: "High",
  },
  {
    id: "TASK-1019",
    type: "Feature",
    title: "Implement automated backup system for critical data",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1020",
    type: "Documentation",
    title: "Document security best practices for development team",
    status: "Done",
    priority: "Medium",
  },
  {
    id: "TASK-1021",
    type: "Bug",
    title: "Debug and fix memory leaks in background workers",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1022",
    type: "Feature",
    title: "Add support for real-time notifications",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1023",
    type: "Documentation",
    title: "Create onboarding documentation for new developers",
    status: "Done",
    priority: "Low",
  },
  {
    id: "TASK-1024",
    type: "Bug",
    title: "Fix race conditions in concurrent operations",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1025",
    type: "Feature",
    title: "Implement data analytics dashboard",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1026",
    type: "Documentation",
    title: "Document database schema and relationships",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1027",
    type: "Bug",
    title: "Fix security vulnerabilities in authentication system",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1028",
    type: "Feature",
    title: "Add support for multiple language localization",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1029",
    type: "Documentation",
    title: "Create API documentation for external developers",
    status: "Backlog",
    priority: "Low",
  },
  {
    id: "TASK-1030",
    type: "Bug",
    title: "Debug and fix payment processing errors",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1031",
    type: "Feature",
    title: "Implement automated testing framework",
    status: "Done",
    priority: "Medium",
  },
  {
    id: "TASK-1032",
    type: "Documentation",
    title: "Document deployment procedures and requirements",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1033",
    type: "Bug",
    title: "Fix data synchronization issues between services",
    status: "Backlog",
    priority: "High",
  },
  {
    id: "TASK-1034",
    type: "Feature",
    title: "Add support for OAuth 2.0 authentication",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1035",
    type: "Documentation",
    title: "Create user manual for administration interface",
    status: "Done",
    priority: "Low",
  },
  {
    id: "TASK-1036",
    type: "Bug",
    title: "Debug and fix cache invalidation issues",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1037",
    type: "Feature",
    title: "Implement real-time chat functionality",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1038",
    type: "Documentation",
    title: "Document system architecture and components",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1039",
    type: "Bug",
    title: "Fix performance issues in search functionality",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1040",
    type: "Feature",
    title: "Add support for file upload and processing",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1041",
    type: "Documentation",
    title: "Create documentation for CI/CD pipeline",
    status: "Backlog",
    priority: "Low",
  },
  {
    id: "TASK-1042",
    type: "Bug",
    title: "Debug and fix user session management issues",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1043",
    type: "Feature",
    title: "Implement data export functionality",
    status: "Done",
    priority: "Medium",
  },
  {
    id: "TASK-1044",
    type: "Documentation",
    title: "Document testing procedures and requirements",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1045",
    type: "Bug",
    title: "Fix UI rendering issues in mobile view",
    status: "Backlog",
    priority: "High",
  },
  {
    id: "TASK-1046",
    type: "Feature",
    title: "Add support for user activity tracking",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1047",
    type: "Documentation",
    title: "Create documentation for monitoring and alerts",
    status: "Done",
    priority: "Low",
  },
  {
    id: "TASK-1048",
    type: "Bug",
    title: "Debug and fix email notification delivery issues",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1049",
    type: "Feature",
    title: "Implement user role management system",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-1050",
    type: "Documentation",
    title: "Document data backup and recovery procedures",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1051",
    type: "Bug",
    title: "Fix cross-site scripting vulnerabilities",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1052",
    type: "Feature",
    title: "Add support for custom report generation",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-1053",
    type: "Documentation",
    title: "Create user guide for reporting features",
    status: "Backlog",
    priority: "Low",
  },
  {
    id: "TASK-1054",
    type: "Bug",
    title: "Debug and fix data validation errors",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TASK-1055",
    type: "Feature",
    title: "Implement advanced search functionality",
    status: "Done",
    priority: "Medium",
  },
  // ... copy all other tasks from your current page.tsx
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const sortDirection = searchParams.get("sort") as "asc" | "desc" | null;
    const sortColumn = searchParams.get("sortColumn") as "title" | "status" | "priority" | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let filteredTasks = [...tasks];

    // Apply filters
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    // Apply sorting
    if (sortDirection && sortColumn) {
      filteredTasks.sort((a, b) => {
        const aValue = a[sortColumn].toLowerCase();
        const bValue = b[sortColumn].toLowerCase();
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    // Apply pagination
    const totalItems = filteredTasks.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return NextResponse.json({
      tasks: paginatedTasks,
      totalItems,
      totalPages,
      currentPage: page,
      success: true
    });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newTask = await request.json();
    const maxId = Math.max(...tasks.map(t => parseInt(t.id.split('-')[1])));
    newTask.id = `TASK-${maxId + 1}`;
    tasks.push(newTask);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add task" },
      { status: 500 }
    );
  }
} 