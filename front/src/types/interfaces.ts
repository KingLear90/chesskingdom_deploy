export const validProfiles = ['admin', 'employee', 'user'] as const

export type Profile = typeof validProfiles[number]

export interface User {
  _id: string;
  name: string;
  email: string;
  profile: Profile;  // Única y estrictamente 'admin', 'employee', o 'user'
}

export interface AppProps {
    children: React.ReactNode;
}

export interface HeaderProps {
    brandName: string;
    brandURL: string;
    navLinks: { name: string; url: string } [];
}

 export interface LogoProps {
    src: string;
    alt: string;
    className: string;
}

export interface FeaturesProps {
    features: {src: string | JSX.Element; title: string} [];
}

export interface FooterProps {
    title: string;
    link1: string;
    img1: string | JSX.Element;
    parentMethod: () => void;
}

export interface EventProps {
    event: JSX.Element | string;
}

export interface CardProps {
    cardData: {
      id: string;
      title: string;
      src: string;
      alt: string;
      description: string;
      imgSize: string;
    };
  }

export interface ChampionsProps {
  champions: { 
    id: string; 
    nombre: string;
    src: string; 
    width: number;
    height: number;
    alt: string;
    className: string;
  } [];
}

export interface Champion {
  id: number | string;
  numChampion: number | string;
  firstName: string;
  lastName: string;
  description: string;
  worldChampion: string;
}

export interface ChessboardProps {
    fen: string;
    onDrop: (sourceSquare: string, targetSquare: string) => boolean;
    boardOrientation: "white" | "black";
}

export interface Product {
  _id: string;
  productName: string;
  price: string | number;
  url: string | undefined;
  description: string | undefined;
  category_id: {
    categoryName: string;
  };
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export interface FormData {
  email: string;
  password: string;
}
