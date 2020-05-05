
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
        temp_max: number,
        feels_like: string
    },
    dt: number,
    wind: {
        speed: number,
        deg: number,
        cardinalDirection: string
    },
    clouds: {
        all: number
    },
    sys: {
        country: string,
        sunrise: number,
        sunset: number,
        sunriseString: string,
        sunsetString: string,
        isDayTime: boolean
    }
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: Blob
        }
    ]
}
