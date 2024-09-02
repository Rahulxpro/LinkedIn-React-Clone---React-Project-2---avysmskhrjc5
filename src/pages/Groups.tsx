// import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Tooltip } from "antd";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createAGroup } from "../apis/groupApis/createGroup";
import { toast } from "react-toastify";
import { fetchAllgroups } from "../apis/groupApis/fetchAllGroups";
import { GroupSuggestion } from "../components/group";
import { RCFooter } from "../components/home/right-column-cards";
import { useDarkMode } from "../contexts/DarkModeProvider";

export interface Owner {
  name: string;
  profileImage: string;
  education: string;
}
export interface Group {
  _id: string;
  name: string;
  description: string;
  image: string;
  owner: Owner;
}
const Groups = () => {
  const [activeTab, setActiveTab] = useState("yourGroups");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  // const [groups, setGroups] = useState<Group[]>([]);
  const { darkMode } = useDarkMode();

  const [groups, setGroups] = useState<Group[]>(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  console.log("groups", groups);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const createGroup = async () => {
    console.log("selectedImageFile", selectedImageFile);
    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("description", description);
    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }
    const res = await createAGroup(formData);
    console.log("res from creatagroup", res);
    if (res.status === "success") {
      toast.success(res.message, { theme: "colored" });
    } else {
      if (res.message === "Channel with this name already exists") {
        toast.error(res.message, { theme: "colored" });
      }
    }
  };

  const getGroups = async () => {
    const res = await fetchAllgroups();
    console.log("res from fetchallgroups", res);
    if (res.status === "success") {
      setGroups(res.data);
      localStorage.setItem("groups", JSON.stringify(res.data));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImageFile(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.length;
    if (wordCount <= 100) {
      setGroupName(inputValue);
    }
  };
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textareaValue = event.target.value;
    const wordCount = textareaValue.length;
    if (wordCount <= 2000) {
      setDescription(textareaValue);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    createGroup();
    getGroups();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const groupDetailsNavigation = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div className="max-[760px]:max-w-[600px] w-[95%] xl:w-[82%] mx-auto grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8">
      {/* CREATE GROUP & DISPLAY GROUPS COLUMN */}
      <div className="col-span-1 md:col-span-3 lg:col-span-4 mb-12 ">
        <div
          className={`shadow-md rounded-md py-4 min-h-[50vh] ${
            darkMode
              ? "bg-black text-white shadow-sm shadow-slate-200"
              : "bg-white"
          }`}
        >
          {/* HEADER: Your groups Requested */}
          <div className="flex  items-center justify-between px-2 sm:px-10">
            {/* Your groups Requested tabs */}
            <div className="flex items-center gap-1 min-[450px]:gap-4">
              <button
                onClick={() => setActiveTab("yourGroups")}
                className={`${
                  activeTab === "yourGroups"
                    ? "text-green-700  border-b-2 border-green-700 border shadow-md rounded-md"
                    : darkMode
                    ? "text-white"
                    : "text-gray-900"
                } font-semibold pb-2 p-1 text-sm min-[450px]:text-lg`}
              >
                Your groups
              </button>
              <button
                onClick={() => setActiveTab("requested")}
                className={`${
                  activeTab === "requested"
                    ? "text-green-700  border-b-2 border-green-700 border shadow-md rounded-md"
                    : darkMode
                    ? "text-white"
                    : "text-gray-900"
                } font-semibold pb-2 p-1 text-sm min-[450px]:text-lg`}
              >
                Requested
              </button>
            </div>
            {/* CREATE GROUP BTN */}
            <Button
              type="primary"
              onClick={showModal}
              className="border-2 border-blue-500 rounded-full px-1 min-[450px]:px-4 py-1 text-blue-600 font-semibold hover:bg-blue-100 text-sm min-[450px]:text-md"
            >
              Create group
            </Button>
            {/* MODAL */}
            <Modal
              title="Create group"
              open={isModalOpen}
              onCancel={handleCancel}
              onOk={handleOk}
              okText="Create" // Set custom text for the OK button
              okButtonProps={{ style: { color: "black" } }}
              cancelButtonProps={{ style: { display: "none" } }}
              width={800}
              style={{ top: 60 }}
            >
              <div className="h-[60vh] overflow-y-auto border-b border-gray-300">
                {/* PROFILE BACKGROUND IMAGE SET */}
                <div className="relative min-h-[25vh] bg-grp-profile-bg-logo bg-cover">
                  <Tooltip
                    placement="bottom"
                    title={"Edit backgound image"}
                    showArrow
                    color="gray"
                  >
                    <button className="absolute top-5 right-10">
                      <FontAwesomeIcon
                        className="size-5 text-white hover:scale-110"
                        icon={faPenToSquare}
                      />
                    </button>
                  </Tooltip>
                  {/* PROFILE IMAGE SET */}
                  <div className="absolute top-28 left-5">
                    <img
                      className="w-32 h-20 object-cover rounded-md "
                      src={selectedImage || "/profile-background-logo.webp"}
                    />
                    <Tooltip
                      placement="bottom"
                      title={"Edit profile image"}
                      showArrow
                      color="gray"
                    >
                      <label className="cursor-pointer absolute top-[3.6rem] left-[8.2rem]">
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <FontAwesomeIcon
                          className="size-5 text-gray-800 hover:scale-110"
                          icon={faPenToSquare}
                        />
                      </label>
                    </Tooltip>
                  </div>
                </div>
                {/* GROUP DETAILS CONTAINER */}
                <div className="px-4">
                  {/* GROUP NAME CONATINER */}
                  <div className="flex flex-col gap-4 mt-8">
                    <p className="text-right">* Indicates required</p>
                    {/* GROUP NAME */}
                    <div className="flex flex-col gap-2">
                      <label>Group name*</label>
                      <input
                        value={groupName}
                        onChange={handleInputChange}
                        className="border border-gray-600 px-4 py-1 rounded"
                        type="text"
                        placeholder="Create a group name e.g (Inspiring Entrepreneurs in DC)"
                      />
                      <p className="text-right">{groupName.length}/100</p>
                    </div>
                    {/* DESCRIPTION */}
                    <div className="flex flex-col gap-2">
                      <label>Description*</label>
                      <textarea
                        value={description}
                        onChange={handleTextareaChange}
                        className="border border-gray-600 px-4 py-1 rounded"
                        rows={4}
                        placeholder="What is the purpose of your group?"
                      />
                      <p className="text-right">{description.length}/2000</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          {/* DIVIDER */}
          <div className="border-b border-gray-200 mb-4" />
          {/* LIST OF ALL GROUPS */}
          {activeTab === "yourGroups" && (
            <div className="px-2 min-[450px]:px-10">
              {/* use map to all groups */}
              {groups.map((group, index) => (
                <div key={group._id}>
                  <div className="flex items-center gap-4 py-2">
                    <img
                      width={50}
                      src={group.image || "/LinkedIn_icon.svg.png"}
                      alt=""
                    />
                    <div className="w-full text-left ">
                      <h2
                        onClick={() => groupDetailsNavigation(group._id)}
                        className={`font-semibold hover:underline cursor-pointer hover:text-blue-500 ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {group.name}
                      </h2>
                      <p className="text-sm">99,776 members</p>
                    </div>
                  </div>
                  {/* DIVIDER */}
                  {index < groups.length - 1 && (
                    <div className="border-b border-gray-200 w-11/12 ml-auto my-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* LIST OF ALL REQUESTED GROUPS */}
          {activeTab === "requested" && (
            <div className="my-[10%]">
              <h1
                className={`text-2xl ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                No requested group found
              </h1>
            </div>
          )}
        </div>
      </div>
      {/*  GROUP SUGGESTION COLUMN */}
      <div className="hidden md:block md:col-span-2 lg:block lg:col-span-2">
        <div>
          <GroupSuggestion />

          <div className="sticky top-20 mb-8">
            {/* PREMIUM NAGIVATION */}
            <div
              onClick={() => navigate("/premium")}
              className="cursor-pointer"
            >
              <img
                className="w-full rounded-md"
                src="/premium_logo.png"
                alt="premium-logo"
              />
            </div>
            {/* RIGHT COLUMN FOOTER */}
            <div className="mb-8">
              <RCFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
