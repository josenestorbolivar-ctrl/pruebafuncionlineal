
import fs from 'fs'
import path from 'path'

export interface UserProgress {
  userId: string
  currentActivity: number
  activities: {
    [activityId: string]: {
      progress: number
      completed: boolean
      started: boolean
      score?: number
      attempts: number
      lastAccessed: string
      timeSpent?: number
    }
  }
  totalProgress: number
  lastAccessed: string
  createdAt: string
}

const PROGRESS_FILE = path.join(process.cwd(), 'data', 'progress.json')

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Load all progress data from file
function loadAllProgress(): { [userId: string]: UserProgress } {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf8')
      return JSON.parse(data)
    }
    return {}
  } catch (error) {
    console.error('Error loading progress:', error)
    return {}
  }
}

// Save all progress data to file
function saveAllProgress(progressData: { [userId: string]: UserProgress }): void {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progressData, null, 2))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

// Initialize progress for a new user
export function initializeUserProgress(userId: string): UserProgress {
  const newProgress: UserProgress = {
    userId,
    currentActivity: 1,
    activities: {},
    totalProgress: 0,
    lastAccessed: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }

  const allProgress = loadAllProgress()
  allProgress[userId] = newProgress
  saveAllProgress(allProgress)
  
  console.log('Initialized progress for user:', userId)
  return newProgress
}

// Get progress for a specific user
export function getUserProgress(userId: string): UserProgress {
  const allProgress = loadAllProgress()
  
  if (!allProgress[userId]) {
    // If no progress exists, initialize for the user
    return initializeUserProgress(userId)
  }
  
  return allProgress[userId]
}

// Update progress for a specific user and activity
export function updateUserProgress(
  userId: string, 
  activityId: number, 
  progressData: {
    progress?: number
    completed?: boolean
    started?: boolean
    score?: number
    attempts?: number
    timeSpent?: number
  }
): UserProgress {
  const allProgress = loadAllProgress()
  
  if (!allProgress[userId]) {
    allProgress[userId] = initializeUserProgress(userId)
  }

  const userProgress = allProgress[userId]
  
  // Update activity specific progress
  if (!userProgress.activities[activityId]) {
    userProgress.activities[activityId] = {
      progress: 0,
      completed: false,
      started: false,
      attempts: 0,
      lastAccessed: new Date().toISOString()
    }
  }

  // Update the activity data
  const activityProgress = userProgress.activities[activityId]
  Object.assign(activityProgress, progressData, {
    lastAccessed: new Date().toISOString()
  })

  // If activity is completed or has 100% progress, mark as completed
  if (progressData.progress === 100 || progressData.completed) {
    activityProgress.completed = true
    activityProgress.progress = 100
  }

  // Update overall user progress
  userProgress.lastAccessed = new Date().toISOString()
  
  // Calculate total progress
  const totalActivities = 10 // Total number of activities
  const completedActivities = Object.values(userProgress.activities)
    .filter(activity => activity.completed).length
  userProgress.totalProgress = Math.round((completedActivities / totalActivities) * 100)

  // Update current activity to next uncompleted activity
  let nextActivity = 1
  for (let i = 1; i <= totalActivities; i++) {
    if (!userProgress.activities[i]?.completed) {
      nextActivity = i
      break
    }
  }
  userProgress.currentActivity = nextActivity

  // Save updated progress
  allProgress[userId] = userProgress
  saveAllProgress(allProgress)
  
  console.log('Updated progress for user:', userId, 'activity:', activityId, 'progress:', progressData)
  return userProgress
}

// Check if an activity is unlocked for a user
export function isActivityUnlocked(userId: string, activityId: number): boolean {
  if (activityId === 1) return true
  
  const userProgress = getUserProgress(userId)
  const previousActivity = userProgress.activities[activityId - 1]
  
  return previousActivity?.completed || false
}

// Get activity status for a user
export function getActivityStatus(userId: string, activityId: number): 'locked' | 'available' | 'in-progress' | 'completed' {
  const userProgress = getUserProgress(userId)
  const activity = userProgress.activities[activityId]
  
  if (!isActivityUnlocked(userId, activityId)) {
    return 'locked'
  }
  
  if (!activity) {
    return 'available'
  }
  
  if (activity.completed) {
    return 'completed'
  }
  
  if (activity.started || activity.progress > 0) {
    return 'in-progress'
  }
  
  return 'available'
}

// Reset progress for a user (useful for testing)
export function resetUserProgress(userId: string): void {
  const allProgress = loadAllProgress()
  delete allProgress[userId]
  saveAllProgress(allProgress)
  console.log('Reset progress for user:', userId)
}

// Get progress summary for all users (for teachers/admin)
export function getAllUsersProgress(): { [userId: string]: UserProgress } {
  return loadAllProgress()
}
