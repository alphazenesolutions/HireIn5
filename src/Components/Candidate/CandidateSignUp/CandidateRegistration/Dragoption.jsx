/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const ItemType = "SKILL";

const DraggableSkill = ({ index, data, moveSkill, getdata }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSkill(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  console.log(index, "index");
  return (
    <div
      className="skillList"
      key={index}
      ref={(node) => ref(drop(node))}
      style={{ opacity, cursor: "move", marginBottom: "10px" }}
    >
      <div className="skillSet">
        <div className="skillbtn">
          <RxHamburgerMenu />
          {index == 0 || index == 1 || index == 2 ? (
            <>
              <button>
                <CiStar />
                <h3>Top Skill</h3>
              </button>
            </>
          ) : (
            <>
              <button>
                <CiStar />
                <h3>Top Skill</h3>
              </button>
            </>
          )}

          <h3>{data}</h3>
        </div>
      </div>
      <MdDeleteOutline
        className="deleteIcon cursor-pointer"
        onClick={() => {
          getdata(data);
        }}
      />
    </div>
  );
};

const Dragoption = ({ skill, getdata }) => {
  const [skills, setSkills] = useState([]);

  const moveSkill = (fromIndex, toIndex) => {
    const newSkills = [...skills];
    const [movedSkill] = newSkills.splice(fromIndex, 1);
    newSkills.splice(toIndex, 0, movedSkill);
    setSkills(newSkills);
  };
  useEffect(() => {
    getalldata();
  }, [skill]);
  const getalldata = () => {
    setSkills(skill);
  };
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {skills.map((skill, index) => (
          <DraggableSkill
            key={index}
            index={index}
            data={skill}
            moveSkill={moveSkill}
            getdata={getdata}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default Dragoption;
