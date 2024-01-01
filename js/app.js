class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000
    this._totalCalories = 0
    this._meals = []
    this._workouts = []
  }

  addMeal(meal) {
    this._meals.push(meal)
    this._totalCalories += meal.calories
  }

  addWorkout(workout) {
    this._workouts.push(workout)
    this._totalCalories -= workout.calories
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2)
    this.name = name
    this.calories = calories
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2)
    this.name = name
    this.calories = calories
  }
}
// ------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const tracker = new CalorieTracker()

  tracker.addMeal(new Meal('Breakfast', 500))
  tracker.addMeal(new Meal('Lunch', 300))
  tracker.addWorkout(new Workout('Run', 320))
  tracker.addWorkout(new Workout('Push ups', 200))

  const caloriesLimit = tracker._calorieLimit
  const caloriesConsumed = tracker._meals.reduce(
    (accumulator, currentValue) => accumulator + currentValue.calories,
    0
  )
  const caloriesBurned = tracker._workouts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.calories,
    0
  )
  const caloriesTotal = caloriesConsumed - caloriesBurned
  const caloriesRemaining = caloriesLimit - caloriesTotal

  const caloriesLimitDiv = document.querySelector('#calories-limit')
  const caloriesTotalDiv = document.querySelector('#calories-total')
  const caloriesConsumedDiv = document.querySelector('#calories-consumed')
  const caloriesBurnedDiv = document.querySelector('#calories-burned')
  const caloriesRemainingDiv = document.querySelector('#calories-remaining')
  if (
    caloriesLimitDiv &&
    caloriesTotalDiv &&
    caloriesConsumedDiv &&
    caloriesBurnedDiv &&
    caloriesRemainingDiv
  ) {
    caloriesLimitDiv.textContent = caloriesLimit
    caloriesTotalDiv.textContent = caloriesConsumed - caloriesBurned
    caloriesConsumedDiv.textContent = caloriesConsumed
    caloriesBurnedDiv.textContent = caloriesBurned
    caloriesRemainingDiv.textContent = caloriesRemaining
  }
  console.log(caloriesLimitDiv)
})

