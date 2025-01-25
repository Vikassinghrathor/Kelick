import React from "react";
import { CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";
import animationData from "@/assets/lottie/end-screen.json";
import { Button, Modal, Text } from "@/components/ui";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SuccessDialog = ({
  isSuccessModalOpen,
  setIsModalOpen,
  onGeneratePayroll,
}) => {
  return (
    <Modal
      isOpen={isSuccessModalOpen}
      onClose={() => setIsModalOpen(false)}
      width="450px"
      height="300px"
    >
      <div className="absolute inset-0 pointer-events-none w-full sm:w-96 h-full sm:h-96">
        <Lottie
          animationData={animationData}
          loop={true}
          className="absolute lg:w-[600px] lg:h-[600px] w-[350px] h-[350px] transform scale-90 sm:scale-100"
        />
      </div>
      <div className="flex flex-col justify-center w-fit gap-2 self-start">
        <div>
          <CheckCircle
            className="text-center w-12 h-12 mx-auto"
            color="#10B981" // Emerald green color
            strokeWidth={1.5}
          />
          <Text tag="h2" className="text-lg text-zinc-900 text-center font-semibold mt-4">
            Congrats! You've successfully added all <br/> your employees!
          </Text>
          <Text tag="h4" className="text-black mt-2 text-center">
            Would you like to generate payroll?
          </Text>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            I'll do it later
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setIsModalOpen(false);
              onGeneratePayroll && onGeneratePayroll();
            }}
          >
            Generate Payroll
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(SuccessDialog);
