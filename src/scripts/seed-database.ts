import clientPromise from "../lib/mongodb";

const sampleTasks = [
  {
    id: "TASK-1001",
    type: "Feature",
    title: "Implement user authentication",
    status: "In Progress",
    priority: "High"
  },
  // Add more sample tasks as needed
];

async function seed() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Clear existing tasks
    await db.collection('tasks').deleteMany({});
    
    // Insert sample tasks
    await db.collection('tasks').insertMany(sampleTasks);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 