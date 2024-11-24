import { DemoData } from "../../utilities";
import "./FrameContainer.css";

type FrameContainerProps = {
  item: DemoData;
};

const FrameContainer = (props: FrameContainerProps) => {
  return (
    <div className="frame-container">
      <img
        src={props.item.download_url}
        alt="demo image"
        height={"100%"}
        width={"100%"}
      />
      <p style={{ alignSelf: "flex-start" }}>{props.item.author}</p>
    </div>
  );
};

export default FrameContainer;
