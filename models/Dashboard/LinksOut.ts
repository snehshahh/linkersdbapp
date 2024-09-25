export interface LinksOut {
    _id: string;
    userId: string;
    url: string;
    description: string;
    tags: string[]; // Assuming tags are always strings
    sharedWith: string[]; // Assuming sharedWith are always strings
    boolImp: boolean;
    createdAt: string; // Assuming createdAt is kept as a string for easier manipulation
    updatedAt: string; // Assuming updatedAt is kept as a string for easier manipulation
    __v: number;
  }
  // Define the context type to include both links and setLinks
export interface LinksContextType {
    links: LinksOut[];
    setLinks: React.Dispatch<React.SetStateAction<LinksOut[]>>;
}