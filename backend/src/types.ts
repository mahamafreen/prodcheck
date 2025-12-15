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

export interface AnalysisRequest {
  imageBase64: string;
  fileName: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: ResultData;
  error?: string;
}
