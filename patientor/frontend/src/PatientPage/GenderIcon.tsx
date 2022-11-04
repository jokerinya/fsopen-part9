import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import BlockIcon from "@mui/icons-material/Block";
import { Gender } from "../types";

const GenderIcon = ({ gender }: { gender: Gender | undefined }) => {
  switch (gender) {
    case "male":
      return <FemaleIcon />;
    case "female":
      return <MaleIcon />;
    case "other":
      return <BlockIcon />;
    default:
      return <BlockIcon />;
  }
};

export default GenderIcon;
