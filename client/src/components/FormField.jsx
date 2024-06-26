import React from 'react';

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[19px] leading-[22px] text-[#dfdfea] mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[19px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        inputType === 'select' ? (
          <select 
            required
            value={value}
            onChange={handleChange}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[19px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          >
            <option value="" disabled>{placeholder}</option>
            <option value="Charity and Nonprofit" className="bg-[#1c1c24] text-white">Charity and Nonprofit</option>
            <option value="Health" className="bg-[#1c1c24] text-white">Health</option> 
            <option value="Personal Emergencies" className="bg-[#1c1c24] text-white">Personal Emergencies</option>
            <option value="Creative Projects" className="bg-[#1c1c24] text-white">Creative Projects</option> 
            <option value="Education" className="bg-[#1c1c24] text-white">Education</option> 
            <option value="Animal Welfare" className="bg-[#1c1c24] text-white">Animal Welfare</option> 
            <option value="Environmental Conservation" className="bg-[#1c1c24] text-white">Environmental Conservation</option> 
          </select>
        ) : (
          <input 
            required
            value={value}
            onChange={handleChange}
            type={inputType}
            step="0.1"
            placeholder={placeholder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[19px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          />
        )
      )}
    </label>
  );
};

export default FormField;
