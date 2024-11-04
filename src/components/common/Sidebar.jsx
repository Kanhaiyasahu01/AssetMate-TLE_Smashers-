import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight, AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import right arrow and menu icons
import { sidebarData } from '../../utils/constant';
import { FaMoneyBill, FaWarehouse, FaUsers, FaTruck, FaBriefcase, FaUserTie, FaTachometerAlt, FaFileAlt } from "react-icons/fa"; // Section icons
import { FaUserGear } from "react-icons/fa6";
import { useSelector } from 'react-redux';

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(null);  // Track active section
  const [activeSubsection, setActiveSubsection] = useState(null); // Track active subsection
  const [isExpanded, setIsExpanded] = useState(true); // Track sidebar expand/collapse state
  const { user } = useSelector(state => state.profile); // Get user role from state

  // Define a function to filter sidebar data based on role
  const filterSidebarData = () => {
    switch (user.role) {
      case 'Admin':
        return sidebarData; // Admin sees all sections
      case 'Sales':
        return sidebarData.filter(menu => menu.title === 'Sales'); // Sales only sees Sales tab
      case 'Stock':
        return sidebarData.filter(menu => menu.title === 'Stock' || menu.title === 'Supplier'); // Stock sees Stock and Supplier tabs
      default:
        return [];
    }
  };

  const filteredSidebarData = filterSidebarData();

  // Handle section expand/collapse
  const handleToggle = (index) => {
    if (activeSection === index) {
      setActiveSection(null);  // If clicking on active section, collapse it
    } else {
      setActiveSection(index);  // Otherwise, set the section as active
      setActiveSubsection(null); // Reset active subsection on section change
    }
  };

  // Function to return icon for each section
  const getMenuIcon = (title) => {
    switch (title) {
      case 'Sales':
        return <FaMoneyBill />;
      case 'Stock':
        return <FaWarehouse />;
      case 'CRM':
        return <FaUsers />;
      case 'Supplier':
        return <FaTruck />;
      case 'Accounts':
        return <FaBriefcase />;
      case 'HRM':
        return <FaUserTie />;
      case 'Dashboard':
        return <FaTachometerAlt />;
      case 'Term':  // Add the Term section icon
        return <FaFileAlt />;
      case 'Settings':
        return <FaUserGear />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-2 shadow-lg flex flex-col justify-between ${isExpanded ? 'w-1/6' : 'w-20'} bg-white transition-width duration-300`}>
      {/* Sidebar Toggle Button */}
      <button 
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Sidebar Content */}
      <ul className="space-y-4 flex-grow overflow-y-auto">
        {filteredSidebarData.map((menu, index) => (
          <li key={index}>
            {menu.title === 'Dashboard' ? ( // Direct link for Dashboard
              <Link
                to={menu.sections[0].path}
                className="font-medium text-lg py-3 px-4 rounded-md bg-blue-200 text-blue-800 hover:bg-blue-300 flex items-center gap-3 transition duration-200 shadow-sm"
              >
                {getMenuIcon(menu.title)}
                {isExpanded && menu.title}
              </Link>
            ) : (
              <>
                <button
                  className={`font-medium text-lg py-3 px-4 rounded-md w-full flex justify-between items-center transition duration-200 shadow-sm ${activeSection === index ? 'border-2 border-green-500' : 'border-b-2 border-richblack-25'}`}
                  onClick={() => handleToggle(index)}
                >
                  <span className="flex items-center gap-3">
                    {getMenuIcon(menu.title)}
                    {isExpanded && menu.title}
                  </span>
                  {isExpanded && (
                    <AiOutlineRight className={`transition-transform duration-200 ${activeSection === index ? 'rotate-90' : ''}`} />
                  )}
                </button>
                {/* Show/Hide modal based on activeSection */}
                {isExpanded && activeSection === index && (
                  <ul className="mt-2 rounded-md transition duration-300 ease-in-out shadow-inner shadow-richblack-100">
                    {menu.sections.map((section, secIndex) => (
                      <li key={secIndex} className="mb-1">
                        <Link
                          to={section.path}
                          onClick={() => setActiveSubsection(secIndex)} // Set active subsection only on click
                          className={`block py-2 px-4 transition duration-200 ${activeSubsection === secIndex ? 'text-white bg-blue-600 rounded-md' : 'hover:bg-richblack-50 hover:rounded-md'}`}
                        >
                          {section.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
