
export interface OtherLink {
  url: string;
  trustRating: 'high' | 'medium' | 'low';
}

export interface ResultData {
  originalLink: string;
  similarityScore: number;
  otherLinks: OtherLink[];
  explanation: string;
}
