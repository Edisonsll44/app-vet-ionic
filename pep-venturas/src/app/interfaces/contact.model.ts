export interface ContactData {
  phone: string;
  whatsapp: string;
  location: {
    lat: number;
    lng: number;
    label: string;
  };
}
