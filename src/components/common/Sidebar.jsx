import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from "react-icons/ai"; // Import right arrow icon
import { sidebarData } from '../../utils/constant';
import { FaMoneyBill, FaWarehouse, FaUsers, FaTruck, FaBriefcase, FaUserTie, FaTachometerAlt, FaFileAlt } from "react-icons/fa"; // Section icons

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(null);  // Track active section

  // Handle section expand/collapse
  const handleToggle = (index) => {
    if (activeSection === index) {
      setActiveSection(null);  // If clicking on active section, collapse it
    } else {
      setActiveSection(index);  // Otherwise, set the section as active
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
      default:
        return null;
    }
  };

  return (
    <div className="w-1/6 bg-gray-800 text-white min-h-screen p-4 flex flex-col justify-between"> {/* Adjusted width to w-1/6 */}
      <ul>
        {sidebarData.map((menu, index) => (
          <li key={index} className="mb-4">
            {menu.title === 'Dashboard' ? ( // Direct link for Dashboard
              <Link
                to={menu.sections[0].path}
                className="font-light mb-2 w-full text-left hover:text-yellow-300 flex items-center gap-2"
              >
                {getMenuIcon(menu.title)} {menu.title}
              </Link>
            ) : (
              <>
                <button
                  className="font-light mb-2 w-full text-left hover:text-yellow-300 flex justify-between items-center"
                  onClick={() => handleToggle(index)}
                >
                  <span className="flex items-center gap-2">
                    {getMenuIcon(menu.title)} {menu.title}
                  </span>
                  <AiOutlineRight className={`transition-transform duration-200 ${activeSection === index ? 'rotate-90' : ''}`} />
                </button>
                {/* Show/Hide modal based on activeSection */}
                {activeSection === index && (
                  <ul className="pl-4 mt-2 bg-gray-700 rounded-md">
                    {menu.sections.map((section, secIndex) => (
                      <li key={secIndex} className="mb-2">
                        <Link
                          to={section.path}
                          className="hover:text-yellow-300 transition duration-200 block p-2 font-light"
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
