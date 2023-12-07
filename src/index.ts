// https://openweathermap.org/current#fields_json

export interface Response<T = number> {
    base: string;
    clounds: {
        all?: T;
        cod?: T;
    };
    coord: {
        lat: T;
        lon: T;
    };
    dt: T;
    id: T;
    main: {
        feels_like: T;
        grnd_level: T;
        humidity: T;
        pressure: T;
        sea_leave: T;
        temp: T;
        temp_max: T;
        temp_min: T;
    };
    name: string;
    sys: {
        country: string;
        id: T;
        sunrise: T;
        sunset: T;
        type: T;
        message?: T;
    };
    timezone: T;
    visibility: T;
    weather: [
        {
            description: string;
            icon: string;
            id: T;
            main: string;
        }
    ];
    wind: {
        deg: T;
        gust?: T;
        speed: T;
    };
    rain?: {
        "1h"?: string;
        "3h"?: string;
    }
    snow?: {
        "1h"?: string;
        "3h"?: string;
    }
}

export const defaultData: Response = {
    base: "",
    clounds: {
        all: 0,
        cod: 0,
    },
    coord: {
        lat: 0,
        lon: 0,
    },
    dt: 0,
    id: 0,
    main: {
        feels_like: 0,
        grnd_level: 0,
        humidity: 0,
        pressure: 0,
        sea_leave: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
    name: "",
    sys: {
        country: "",
        id: 0,
        sunrise: 0,
        sunset: 0,
        type: 0,
    },
    timezone: 0,
    visibility: 0,
    weather: [
        {
            description: "",
            icon: "",
            id: 0,
            main: "",
        },
    ],
    wind: {
        deg: 0,
        gust: 0,
        speed: 0,
    },
}

export const apiKey = process.env.API_KEY as string;

export interface Cities {
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    geoname: {
        cl: string;
        code: string;
        parent: number;
    };
    id: number;
    // langs?: any[];
    name: string;
    stat: {
        level: number;
        population: number;
    };
    // stations: {
    //     dist: number;
    //     id: number;
    //     kf: number;
    // }[];
    zoom: number;
}

export type List = {
    name: string,
    country: string,
    id: number,
  }