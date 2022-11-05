import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import BlockIcon from "@mui/icons-material/Block";
import { Gender } from "../types";

const GenderIcon = ({ gender }: { gender: Gender | undefined }) => {
  switch (gender) {
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    case "other":
      return <BlockIcon />;
    default:
      return <BlockIcon />;
  }
};

export default GenderIcon;
