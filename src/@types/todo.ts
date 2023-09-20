export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export interface WeatherResponse {
  current: {
    country: string,
    temp_c: number,
    temp_f: number,
    lat: number
  },
  location: {
    name: string,
    region: string
  }
}

type dataset = {
  label: string,
  backgroundColor: string,
  borderColor: string,
  data: number[]
}

export interface WeatherData {
  labels: string[],
  datasets: dataset[]
}

export interface Options {
  responsive: boolean,
  plugins: {
    legend: {
      position: any // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    title: {
      display: boolean,
      text: string
    }
  }
}

export type TodoContextType = {
  todos: ITodo[];
  testVariable: string,
  saveTodo: (todo: ITodo) => void;
  updateTodo: (id: number) => void;
};