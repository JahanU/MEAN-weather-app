
export interface singleWeather {
    id: string,
    name: string,
    coord: {
        lon: number,
        lat: number
    },
    main: {
        temp: number,
        pressure: number,
        humidity: number,
        temp_min: number,
        temp_max: number
    },
    dt: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: Blob
        }
    ]
}
