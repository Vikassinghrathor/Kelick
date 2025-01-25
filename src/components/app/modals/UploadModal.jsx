import { useRef, useState, useCallback, useEffect } from "react";
import { read, utils } from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "@/assets";
import { sample_excel } from "@/assets";
import { Modal, Text, Button, Input, Icon } from "../../ui";

const UploadFile = ({ isModalOpen, onModalClose, onSubmit }) => {
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    fileData: [],
    fileName: "",
    error: "",
    progress: 0,
    dragging: false,
    draggedFileName: "",
  });

  const fileInputRef = useRef(null);
  const isContinueBtnDisabled = () =>
    uploadState.fileData?.length === 0 || uploadState.isUploading;
  const downloadFile = useCallback(async () => {
    try {
      const response = await fetch(sample_excel, { method: "GET" });
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = sample_excel.split("/").pop();
        link.click();
      } else {
        console.error("Failed to fetch the file");
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setUploadState((prevState) => ({ ...prevState, dragging: false }));
    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    setUploadState((prevState) => ({
      ...prevState,
      dragging: true,
      draggedFileName: file?.name || "Uploading file...",
    }));
  }, []);

  const handleDragLeave = useCallback(() => {
    setUploadState((prevState) => ({ ...prevState, dragging: false }));
  }, []);

  const processFile = (file) => {
    setUploadState((prevState) => ({
      ...prevState,
      isUploading: true,
      progress: 0,
      fileName: file.name,
      error: "",
    }));
    simulateUploadProgress();

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        let data;
        if (fileExtension === "xlsx" || fileExtension === "csv") {
          const workbook = read(event.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          data = utils.sheet_to_json(sheet, { header: 1 });
        }

        const result = data
          .slice(1)
          .filter((row) => row.length > 0)
          .map((row) => {
            const obj = {};
            data[0].forEach((header, index) => {
              obj[header] = row[index];
            });
            return obj;
          });

        setUploadState((prevState) => ({
          ...prevState,
          fileData: result,
          error: "",
          progress: 100,
        }));
      } catch (err) {
        setUploadState((prevState) => ({
          ...prevState,
          error: "Error reading the file",
          isUploading: false,
          progress: 0,
        }));
      }
    };

    if (fileExtension === "xlsx") {
      reader.readAsBinaryString(file);
    } else if (fileExtension === "csv") {
      reader.readAsText(file);
    } else {
      setUploadState((prevState) => ({
        ...prevState,
        error: "Please upload a valid .xlsx or .csv file",
        isUploading: false,
        progress: 0,
      }));
    }
  };

  const simulateUploadProgress = () => {
    let simulatedProgress = 10;
    const interval = setInterval(() => {
      simulatedProgress += 10;
      setUploadState((prevState) => ({
        ...prevState,
        progress: simulatedProgress,
      }));
      if (simulatedProgress >= 100) {
        setUploadState((prevState) => ({
          ...prevState,
          isUploading: false,
        }));
        clearInterval(interval);
      }
    }, 200);
  };

  const handleCloseClick = () => {
    setUploadState({
      isUploading: false,
      fileData: [],
      fileName: "",
      error: "",
      progress: 0,
      dragging: false,
      draggedFileName: "",
    });
    onModalClose();
  };

  const handleContinue = () => {
    onSubmit(uploadState.fileData);
  };

  useEffect(() => {
    return () => {
      setUploadState({
        isUploading: false,
        fileData: [],
        fileName: "",
        error: "",
        progress: 0,
        dragging: false,
        draggedFileName: "",
      });
    };
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseClick} title="Upload File">
      <div className="flex flex-col justify-center w-full gap-2">
        <motion.div
          className={`w-full h-60 p-4 flex flex-col justify-center items-center border-dashed ${
            uploadState.error
              ? "border-red-500"
              : uploadState.dragging
              ? "border-light-teal"
              : uploadState.fileName
              ? "border-light-teal"
              : "border-light-gray-200"
          } bg-light-gray-400 rounded-2xl border-[2px] relative`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <AnimatePresence mode="wait">
            {!uploadState.fileName && (
              <motion.div
                key="folder-icon"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Icon src={ICONS.FolderIcon} width={4.5} height={4.5} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!uploadState.fileName && (
              <motion.div
                key="upload-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Text
                  tag="span"
                  className="font-quicksand font-medium text-sm leading-6 text-light-gray text-center flex flex-col items-center"
                >
                  Drag and drop your files here <br />
                  <span className="flex items-center gap-1">
                    or{" "}
                    <Button
                      onClick={() => fileInputRef.current.click()}
                      variant="ghost"
                      className="underline text-light-gray font-quicksand font-bold text-sm leading-6"
                    >
                      click to upload
                    </Button>
                  </span>
                  <Input
                    className="hidden"
                    type="file"
                    accept=".xlsx, .csv"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                </Text>
              </motion.div>
            )}
          </AnimatePresence>

          {uploadState.dragging && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 flex items-center justify-center bg-white/50"
            >
              <div className="w-auto h-7 bg-light-teal py-[2px] px-3 rounded-xl">
                <span className="font-bold font-quicksand text-xs leading-5 text-white">
                  {uploadState.draggedFileName}
                </span>
              </div>
            </motion.div>
          )}

          {uploadState.fileData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-auto h-7 bg-light-teal py-[2px] px-3 rounded-xl"
            >
              <span className="font-bold font-quicksand text-xs leading-5 text-white">
                {uploadState.fileName}
              </span>
            </motion.div>
          )}
        </motion.div>

        {uploadState.isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex flex-col justify-center items-center"
          >
            <div className="w-3/4 h-4 bg-gray-200 rounded-md overflow-hidden">
              <motion.div
                className="h-4 bg-teal-500 rounded-md"
                initial={{ width: "0%" }}
                animate={{ width: `${uploadState.progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <p className="w-3/4 text-gray-600 text-sm mb-2 self-center">
              Please wait while we upload your file...
            </p>
          </motion.div>
        )}

        <div className="flex w-full justify-between">
          <Text
            className={`font-quicksand font-semibold text-xs leading-5 ${
              uploadState.error ? "text-red-500" : "text-light-gray-300"
            }`}
          >
            Supported formats: XLS, CSV
          </Text>
          <Text
            className={`font-quicksand font-semibold text-xs leading-5 ${
              uploadState.error ? "text-red-500" : "text-light-gray-300"
            }`}
          >
            Maximum file size: 25MB
          </Text>
        </div>

        <div className="w-full h-auto gap-6 lg:h-24 bg-light-gray-100 flex flex-col lg:flex-row p-4 rounded-xl justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <Icon src={ICONS.ExcelIcon} width={2.6} height={2.5} />
            <div className="flex flex-col">
              <Text className="font-quicksand font-bold text-sm leading-6 text-dark-gray">
                Table Example
              </Text>
              <Text className="font-quicksand font-medium text-xs leading-5 text-light-gray-300 mb-2 lg:mb-0">
                You can download the attached example and <br /> use them as a
                starting point for your own file.
              </Text>
            </div>
          </div>

          <Button
            variant="secondary"
            size="small"
            iconStart={ICONS.DownloadIcon}
            aria-label="Download xlsx button"
            onClick={downloadFile}
            altIcon="Download XLSX"
          >
            Download XLSX
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-0 lg:mt-7 self-end">
        <Button
          variant="secondary"
          aria-label="Cancel upload"
          onClick={handleCloseClick}
        >
          Cancel
        </Button>
        <Button
          disabled={isContinueBtnDisabled()}
          aria-label="Continue upload"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default UploadFile;
