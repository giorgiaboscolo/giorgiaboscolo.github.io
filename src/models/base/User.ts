
export interface FbrUserData {
    uid: string;
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    roles: FbrUserRoles;
}

export interface FbrUser {
    loggedIn: boolean;
    data?: FbrUserData;
}

export interface FbrUserRoles {
    admin?: boolean;
    inventory?: boolean;
    counter?: boolean;
    delivery?: boolean;
}

export function toFbrUserRoles(e: any) {
    return {
        admin: e.admin ? e.admin : false,
        inventory: e.inventory ? e.inventory : false,
        counter: e.counter ? e.counter : false,
        delivery: e.delivery ? e.delivery : false,
    };
}
