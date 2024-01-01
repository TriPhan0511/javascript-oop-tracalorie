// CalorieTracker class
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

  _displayCaloriesTotal(ele) {
    if (ele) {
      ele.textContent = this.caloriesTotal
    }
  }

  _displayCaloriesLimit(ele) {
    if (ele) {
      ele.textContent = this._calorieLimit
    }
  }

  _displayCaloriesConsumed(ele) {
    if (ele) {
      ele.textContent = this.caloriesConsumed
    }
  }

  _displayCaloriesBurned(ele) {
    if (ele) {
      ele.textContent = this.caloriesBurned
    }
  }

  _displayCaloriesRemaining(ele) {
    if (ele) {
      ele.textContent = this.caloriesRemaining
    }
  }

  _renderStats() {
    const limitDiv = document.querySelector('#calories-limit')
    const totalDiv = document.querySelector('#calories-total')
    const consumedDiv = document.querySelector('#calories-consumed')
    const burnedDiv = document.querySelector('#calories-burned')
    const remainingDiv = document.querySelector('#calories-remaining')

    this._displayCaloriesLimit(limitDiv)
    this._displayCaloriesTotal(totalDiv)
    this._displayCaloriesConsumed(consumedDiv)
    this._displayCaloriesBurned(burnedDiv)
    this._displayCaloriesRemaining(remainingDiv)
  }

  get caloriesConsumed() {
    return this._meals.reduce(
      (accumulator, currentValue) => accumulator + currentValue.calories,
      0
    )
  }

  get caloriesBurned() {
    return this._workouts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.calories,
      0
    )
  }

  get caloriesTotal() {
    return this.caloriesConsumed - this.caloriesBurned
  }

  get caloriesRemaining() {
    if (this.caloriesTotal === 0) {
      return 0
    }
    return this._calorieLimit - this.caloriesTotal
  }

  setLimit(limit) {
    this._calorieLimit = parseInt(limit)
    this._renderStats()
  }

  resetDay() {
    this._calorieLimit = 2000
    this._totalCalories = 0
    this._meals = []
    this._workouts = []
    this._renderStats()
  }

  loadItems() {
    this._renderStats()
    this._displayMeals()
    this._displayWorkouts()
  }

  _displayMeals() {
    const mealItems = document.querySelector('#meal-items')
    if (mealItems) {
      mealItems.innerHTML = ''
      this._meals.forEach(({ id, name, calories }) => {
        const div = document.createElement('div')
        div.className = 'card my-2'
        div.innerHTML = `
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mx-1">${name}</h4>
              <div
                class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
              >
                ${calories}
              </div>
              <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        `
        mealItems.appendChild(div)
      })
    }
  }

  _displayWorkouts() {
    const workoutItems = document.querySelector('#workout-items')
    if (workoutItems) {
      workoutItems.innerHTML = ''
      this._workouts.forEach(({ name, calories }) => {
        const div = document.createElement('div')
        div.className = 'card my-2'
        div.innerHTML = `
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mx-1">${name}</h4>
              <div
                class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
              >
                ${calories}
              </div>
              <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        `
        workoutItems.appendChild(div)
      })
    }
  }
}

// Meal class
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

// App class
class App {
  constructor() {
    // Initialize a CalorieTracker instance
    const tracker = new CalorieTracker()

    // Add `DOMContentLoaded` event listener for document
    document.addEventListener('DOMContentLoaded', () => {
      tracker.addMeal(new Meal('Breakfast', 350))
      tracker.addMeal(new Meal('Lunch', 620))
      tracker.addWorkout(new Workout('Treadmill 1 Hour', 400))
      tracker.addWorkout(new Workout('Bike 90 Minutes', 500))
      tracker.loadItems()
    })

    // Set calories limit
    this._setLimit(tracker)

    // Reset day
    this._reset(tracker)

    // Add new item
    this._newItem(tracker)
  }

  _setLimit(tracker) {
    // Add `submit` event listener for `limit-form`
    const limitForm = document.querySelector('#limit-form')
    if (limitForm) {
      limitForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const limit = document.querySelector('#limit')
        if (limit) {
          const val = parseInt(limit.value)
          if (!isNaN(val)) {
            tracker.setLimit(val)
          }
          limit.value = ''
        }
      })
    }
  }

  _reset(tracker) {
    // Add `click` event listener for `reset button`
    const resetBtn = document.querySelector('#reset')
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        tracker.resetDay()
      })
    }
  }

  _newItem(tracker) {
    const mealForm = document.querySelector('#meal-form')
    const workoutForm = document.querySelector('#workout-form')
    if (mealForm && workoutForm) {
      mealForm.addEventListener('submit', (e) =>
        this._addNewItem(e, tracker, '#meal-name', '#meal-calories')
      )
      workoutForm.addEventListener('submit', (e) =>
        this._addNewItem(
          e,
          tracker,
          '#workout-name',
          '#workout-calories',
          false
        )
      )
    }
  }

  _addNewItem(e, tracker, nameInpId, caloriesInpId, isMeal = true) {
    e.preventDefault()
    const nameInp = document.querySelector(nameInpId)
    const caloriesInp = document.querySelector(caloriesInpId)
    if (nameInp && caloriesInp) {
      const name = nameInp.value.trim()
      const calories = parseInt(caloriesInp.value)
      if (name !== '' && !isNaN(calories)) {
        if (isMeal) {
          tracker.addMeal(new Meal(name, calories))
        } else {
          tracker.addWorkout(new Workout(name, calories))
        }
        tracker.loadItems()
      }
    }
  }

  _removeItem() {}
}

// ------------------------------------------
// Run app
new App()
