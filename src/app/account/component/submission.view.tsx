import { Product } from "@/types";
import Submission from "./submission";

interface SubmissionViewProps {
  mySubmissions: Product
}

const SubmissionView = ({ mySubmissions }: SubmissionViewProps) => {
  return (
    <Submission products={mySubmissions} />
  );
};

export default SubmissionView;
