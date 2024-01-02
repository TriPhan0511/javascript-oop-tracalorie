// CalorieTracker class
class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000
    this._totalCalories = 0
    this._meals = []
    this._workouts = []

    // Dummy data
    this.addMeal(new Meal('Breakfast', 350))
    this.addMeal(new Meal('Lunch', 620))
    this.addWorkout(new Workout('Treadmill 1 Hour', 400))
    this.addWorkout(new Workout('Bike 90 Minutes', 500))

    // Render Stats
    // this._renderStats()
    this._displayCaloriesLimit(document.querySelector('#calories-limit'))
    this._displayCaloriesConsumed(document.querySelector('#calories-consumed'))
    this._displayCaloriesBurned(document.querySelector('#calories-burned'))
    this._displayCaloriesRemaining(
      document.querySelector('#calories-remaining')
    )
    this._displayCaloriesTotal(document.querySelector('#calories-total'))
  }

  _displayCaloriesTotal(ele) {
    if (ele) {
      ele.textContent = this._totalCalories
    }
  }
  _displayCaloriesLimit(ele) {
    if (ele) {
      ele.textContent = this._calorieLimit
    }
  }
  _displayCaloriesConsumed(ele) {
    if (ele) {
      ele.textContent = this._meals.reduce(
        (accumulator, currentValue) => accumulator + currentValue.calories,
        0
      )
    }
  }
  _displayCaloriesBurned(ele) {
    if (ele) {
      ele.textContent = this._workouts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.calories,
        0
      )
    }
  }
  _displayCaloriesRemaining(ele) {
    if (ele) {
      ele.textContent = this._calorieLimit - this._totalCalories
    }
  }

  _displayMeal({ id, name, calories }) {
    const mealItems = document.querySelector('#meal-items')
    if (mealItems) {
      const div = document.createElement('div')
      div.setAttribute('id', id)
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
    }
  }

  _displayWorkout({ id, name, calories }) {
    const workoutItems = document.querySelector('#workout-items')
    if (workoutItems) {
      const div = document.createElement('div')
      div.setAttribute('id', id)
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
    }
  }

  _displayWorkouts() {
    const workoutItems = document.querySelector('#workout-items')
    if (workoutItems) {
      workoutItems.innerHTML = ''
      this._workouts.forEach(({ id, name, calories }) => {
        const div = document.createElement('div')
        div.setAttribute('id', id)
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

  _renderStats() {
    const limitDiv = document.querySelector('#calories-limit')
    const consumedDiv = document.querySelector('#calories-consumed')
    const burnedDiv = document.querySelector('#calories-burned')
    const remainingDiv = document.querySelector('#calories-remaining')
    const totalDiv = document.querySelector('#calories-total')

    this._displayCaloriesLimit(limitDiv)
    this._displayCaloriesConsumed(consumedDiv)
    this._displayCaloriesBurned(burnedDiv)
    this._displayCaloriesRemaining(remainingDiv)
    this._displayCaloriesTotal(totalDiv)
  }

  addMeal(meal) {
    this._meals.push(meal)
    this._totalCalories += meal.calories
  }

  removeMeal(id) {
    const removedMeal = this._meals.find((meal) => meal.id === id)
    if (removedMeal) {
      this._totalCalories -= removedMeal.calories
    }
    this._meals = this._meals.filter((meal) => meal.id !== id)
  }

  addWorkout(workout) {
    this._workouts.push(workout)
    this._totalCalories -= workout.calories
  }

  removeWorkout(id) {
    const removedWorkout = this._workouts.find((workout) => workout.id === id)
    if (removedWorkout) {
      this._totalCalories += removedWorkout.calories
    }
    this._workouts = this._workouts.filter((workout) => workout.id !== id)
  }

  resetDay() {
    this._calorieLimit = 0
    this._totalCalories = 0
    this._meals = []
    this._workouts = []
    this.loadItems()
  }

  setLimit(limit) {
    this._calorieLimit = parseInt(limit)
    this._renderStats()
  }

  loadItems() {
    this._renderStats()
    this._meals.forEach((meal) => this._displayMeal(meal))
    this._workouts.forEach((workout) => this._displayWorkout(workout))
  }

  // loadItems() {
  //   this._renderStats()
  //   this._displayMeals()
  //   this._displayWorkouts()
  // }
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

    // Render items
    tracker.loadItems()

    // Set calories limit
    this._setLimit(tracker)

    // Reset day
    this._reset(tracker)

    // Add new item
    this._newItem(tracker)

    // Remove an item
    this._removeItem(tracker)
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
        nameInp.value = ''
        caloriesInp.value = ''
      }
    }
  }

  _removeItem(tracker) {
    this._removeMealOrWorkout('#meal-items', tracker)
    this._removeMealOrWorkout('#workout-items', tracker, false)
  }

  _removeMealOrWorkout(selectorId, tracker, isMeal = true) {
    const itemsSection = document.querySelector(selectorId)
    if (itemsSection) {
      itemsSection.addEventListener('click', (e) => {
        let card
        if (e.target.nodeName === 'I') {
          card =
            e.target.parentElement.parentElement.parentElement.parentElement
        } else if (e.target.nodeName === 'BUTTON') {
          card = e.target.parentElement.parentElement.parentElement
        }
        if (card && card.classList.contains('card')) {
          card.remove()
          if (isMeal) {
            tracker.removeMeal(card.getAttribute('id'))
          } else {
            tracker.removeWorkout(card.getAttribute('id'))
          }
          tracker.loadItems()
        }
      })
    }
  }
}

// ------------------------------------------
// Run app
new App()

// class Person {
//   constructor(id, name) {
//     this.id = id
//     this.name = name
//   }
// }

// let people = [
//   new Person('1', 'Alex'),
//   new Person('2', 'Brad'),
//   new Person('3', 'Cindy'),
// ]

// console.log(people)

// people = people.filter((p) => p.id !== '2')
// // people = people.filter((p) => p.id !== undefined)

// console.log(people)
