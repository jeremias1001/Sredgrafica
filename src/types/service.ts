export interface Service {
    id: number;
    title: string;
    price: number;
    description: string;
    inclusions: string[];
    exclusions: string[];
    image: string;
    popular?: boolean;
    recurring?: boolean;
}

export interface ServiceCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    image: string;
    services: Service[];
}

export interface CartService extends Service {
    categoryId: string;
    categoryName: string;
}
