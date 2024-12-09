import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('tasks');

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const sortDirection = searchParams.get("sort") as "asc" | "desc" | null;
    const sortColumn = searchParams.get("sortColumn") as "title" | "status" | "priority" | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Build query
    let query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Build sort
    let sort: any = {};
    if (sortDirection && sortColumn) {
      sort[sortColumn] = sortDirection === "asc" ? 1 : -1;
    }

    // Get total count for pagination
    const totalItems = await collection.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated tasks
    const tasks = await collection
      .find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      tasks,
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
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('tasks');
    
    const newTask = await request.json();
    
    // Generate a new task ID
    const lastTask = await collection
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();
      
    const lastId = lastTask.length > 0 
      ? parseInt(lastTask[0].id.split('-')[1]) 
      : 1000;
    
    newTask.id = `TASK-${lastId + 1}`;
    
    await collection.insertOne(newTask);
    
    return NextResponse.json({ success: true, task: newTask });
  } catch (error) {
    console.error("Failed to add task:", error);
    return NextResponse.json(
      { error: "Failed to add task" },
      { status: 500 }
    );
  }
} 