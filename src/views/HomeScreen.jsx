import dynamic from "next/dynamic";
import { Layout } from "@/components/layout";
import { Suspense, useEffect, useMemo, useState } from "react";
import BuildTeam from "@/components/app/landing/BuildTeam";
import { getCount } from "@/utility/getCount";
import {
  employeeRoleConst,
  employeeStatusConst,
} from "@/constants/appConstants";
import { useAppContext } from "@/context/AppContext";
import { Loader } from "@/components/ui";

const EmployeeDashboard = dynamic(() =>
  import("@/components/app/dashboard/EmployeeDashboard")
);
const UploadFile = dynamic(() => import("@/components/app/modals/UploadModal"));

const HomeScreen = () => {
  const { setApplicationContext } = useAppContext() || {};
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [filter, setFilter] = useState({ role: "", status: "" });
  const [employeeOptions, setEmployeeOption] = useState({});

  const handleModalClose = () => {
    setOpen((prev) => !prev);
  };

  const handleFileUploadSubmit = (file) => {
    setIsLoading(true);
    setFile(file);
    setOpen(() => false);
    setTimeout(() => {
      setIsLoading(false);
    }, [1000]);
  };

  const handleTableFilter = (type, selectedValue) => {
    setFilter((prev) => ({ ...prev, [type]: selectedValue }));
  };

  useEffect(() => {
    if (file.length === 0) {
      setApplicationContext({
        topNav: {
          showAddEmployee: false,
        },
      });
      return;
    }
    const { title } = employeeRoleConst || {};
    const roleCount = getCount(title.key, file);
    const statusCount = getCount(employeeStatusConst.title.key, file);
    setEmployeeOption((prev) => ({
      ...prev,
      roleOptions: ["All Role", ...Object.keys(roleCount)],
      statusOptions: ["All Status", ...Object.keys(statusCount)],
    }));
    setApplicationContext({
      topNav: {
        showAddEmployee: true,
      },
    });
  }, [file]);

  const filteredEmployees = useMemo(() => {
    return file.filter((employee) => {
      const roleMatch =
        filter.role && filter.role !== "All Role"
          ? employee.Role.toLowerCase().includes(filter.role.toLowerCase())
          : true;
      const statusMatch =
        filter.status && filter.status !== "All Status"
          ? employee.Status.toLowerCase().includes(filter.status.toLowerCase())
          : true;
      const searchMatch = filter.searchedText
        ? employee.Employee.toLowerCase().includes(
            filter.searchedText.toLowerCase()
          )
        : true;

      return roleMatch && statusMatch && searchMatch;
    });
  }, [file, filter]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <UploadFile
          isModalOpen={isOpen}
          onModalClose={handleModalClose}
          onSubmit={handleFileUploadSubmit}
        />
        {isLoading && <Loader />}
        {file?.length === 0 ? (
          <BuildTeam onBulkUploadClick={handleModalClose} />
        ) : (
          <EmployeeDashboard
            employeeOptions={employeeOptions}
            fileData={filteredEmployees}
            onSelectFilter={handleTableFilter}
          />
        )}
      </Suspense>
    </Layout>
  );
};

export default HomeScreen;
