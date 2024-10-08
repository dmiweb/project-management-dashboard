import { Subject, startWith, scan, share } from "rxjs";

const ACTIONS = {
  Increment: "INCREMENT",
  Decrement: "DECREMENT",
  CalcCounter: "CALCCOUNTER",
};

export default class Store {
  constructor() {
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: " INITIALIZATION " }),
      scan((state, action) => this.reduce(state, action), { counter: 0 }),
      share()
    );
  }

  dispatch(type, payload = null) {
    this.actions$.next({ type, payload });
  }
  calc(value = null) {
    this.dispatch(ACTIONS.CalcCounter, value);
  }
  inc(value = null) {
    this.dispatch(ACTIONS.Increment, value);
  }
  dec(value = null) {
    this.dispatch(ACTIONS.Decrement, value);
  }

  reduce(state, action) {
    switch (action.type) {
      case ACTIONS.CalcCounter:
        return {
          ...state,
          counter: action.payload,
        };
      case ACTIONS.Increment:
        return {
          ...state,
          counter: state.counter + (action.payload || 1),
        };
      case ACTIONS.Decrement:
        return {
          ...state,
          counter: state.counter - (action.payload || 1),
        };
      default:
        return state;
    }
  }

  registerEvent(e) {
    if (e.target.checked) {
      this.dec();
    } else {
      this.inc();
    }
  }
}
