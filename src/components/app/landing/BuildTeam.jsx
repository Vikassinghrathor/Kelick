import React from "react";
import { ICONS } from "@/assets";
import { Card } from "@/components/styles/StyledCard";
import { Icon, Text, Button } from "@/components/ui";

const BuildTeam = ({ onBulkUploadClick, onAddEmployee }) => {
  return (
    <Card
      className="flex justify-center border border-[#B3BEBE] w-full lg:w-11/12 rounded-2xl"
      style={{
        height: "500px",
        margin: "16px",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="w-1/2 h-full flex flex-col gap-2 items-center justify-center">
        <Icon priority src={ICONS.SearchUser} width={13.75} height={13.75} />
        <Text
          tag="h3"
          className="font-quicksand font-bold text-3xl leading-10 align-middle tracking-tighter text-dark-gray"
        >
          Start building your team
        </Text>
        <Text
          tag="h4"
          className="font-quicksand font-medium text-base leading-6 align-middle tracking-tighter text-light-gray-300"
        >
          Add your first team member or import your entire team.
        </Text>
        <div className="flex flex-row gap-4 mt-7">
          <Button
            variant="secondary"
            iconStart={ICONS.BulkUpload}
            onClick={onBulkUploadClick}
            aria-label="Bulk Upload button"
            altIcon="upload"
          >
            Bulk Upload
          </Button>
          <Button
            iconStart={ICONS.AddEmployee}
            onClick={onAddEmployee}
            alt="add"
            aria-label="Add Employee button"
          >
            Add Employee
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(BuildTeam);
