// import React from 'react'
import { useParams } from "react-router-dom";
import { fetchSingleGroup } from "../apis/groupApis/fetchSingleGroup";
import { useEffect, useState } from "react";
import Lcard2 from "../components/home/left-column-cards/LCard2";
import { Group } from "./Groups";
import { GDLcard1, GroupInfo, GroupSuggestion } from "../components/group";
import { useDarkMode } from "../contexts/DarkModeProvider";

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [singleGroup, setSingleGroup] = useState<Group>({
    name: "",
    _id: "",
    description: "",
    image: "",
    owner: {
      name: "",
      profileImage: "",
      education: "",
    },
  });

  const { darkMode } = useDarkMode();

  useEffect(() => {
    getGroupDetails();
  }, []);

  const getGroupDetails = async () => {
    if (!groupId) {
      console.error("groupId is undefined");
      return;
    }
    const res = await fetchSingleGroup(groupId);
    console.log("res from fetchSingleGroup", res);
    if (res.status === "success") {
      setSingleGroup(res.data);
    }
  };

  const leftColumnCards = [
    {
      title: "Left col profile card in groupDetails page",
      content: <GDLcard1 />,
    },
    { title: "Left col events card", content: <Lcard2 /> },
  ];

  return (
    <div className="max-[760px]:max-w-[600px] w-[95%] xl:w-[82%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* LEFT COLUMN CONTAINER */}
      <div className="hidden md:block md:col-span-1 lg:block lg:col-span-1">
        {leftColumnCards.map((card, index) => (
          <div key={index}>{card.content}</div>
        ))}
      </div>
      {/* MIDDLE COLUMN CONTAINER */}
      <div className="col-span-full md:col-span-2 lg:col-span-2 mb-12">
        <GroupInfo singleGroup={singleGroup} />
      </div>
      {/* RIGHT COLUMN CONTAINER */}
      <div className="hidden  lg:block lg:col-span-1">
        {/* ADMIN INFO CARD */}
        <div
          className={`shadow-md rounded-md p-4 flex flex-col gap-4 min-h-[22vh] mb-4 ${
            darkMode
              ? "bg-black text-white shadow-sm shadow-slate-200"
              : "bg-white"
          }`}
        >
          <h3 className="text-left text-lg font-semibold">Admin</h3>
          <div className="flex gap-4">
            <img
              width={50}
              src={singleGroup.owner.profileImage || "/profile-logo.png"}
              alt="admin-logo"
            />
            <div className="text-left">
              <p className="font-semibold">{singleGroup.owner.name}</p>
              <p>
                .3rd <span className="bg-gray-200 rounded">Owner</span>
              </p>
              <p>{singleGroup.owner.education}</p>
            </div>
          </div>
        </div>

        {/* GROUPS MIGHT INTERESTED CARD */}
        <GroupSuggestion />
      </div>
    </div>
  );
};

export default GroupDetails;
