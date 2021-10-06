import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
// import PropTypes from 'prop-types'
import { AiOutlineUser, AiFillCaretDown, AiFillAppstore, AiOutlineHome, AiOutlineDashboard, AiOutlineOrderedList, AiOutlineUsergroupAdd, AiOutlineTool, AiOutlineAccountBook, AiOutlineShoppingCart, AiOutlineSetting, AiOutlineOneToOne, AiOutlineCheckSquare, AiFillDollarCircle, AiTwotoneTool, AiOutlineUserSwitch } from "react-icons/ai";
import { BsBucketFill, BsFillPersonFill, BsFillPersonLinesFill, BsFillTagFill, BsWrench } from "react-icons/bs";
import { MdAttachMoney } from 'react-icons/md'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { GoDatabase } from 'react-icons/go'
// Types: 
// __________________________

export const Menus = [
    {
        key: 1,
        name: "Dashboard",
        link: "/dashboard",
        icon: <AiOutlineDashboard />,
        user: "all",
    },
    {
        key: 14,
        name: " My Union",
        link: "/request-union",
        icon: <AiOutlineUsergroupAdd />,
        user: "members",
    },
    {
        key: 15,
        name: " My cooperatives",
        link: "/confirm-union",
        icon: <AiOutlineUsergroupAdd />,
        user: "union",
    },
    {
        key: 16,
        name: " My federation",
        link: "/request-federation",
        icon: <AiOutlineUsergroupAdd />,
        user: "union",
    },
    {
        key: 17,
        name: " My unions",
        link: "/confirm-federation",
        icon: <AiOutlineUsergroupAdd />,
        user: "federation",
    },
    {
        key: 19,
        name: " My confederation",
        link: "/request-confederation",
        icon: <AiOutlineUsergroupAdd />,
        user: "federation",
    },
    {
        key: 20,
        name: " My federations",
        link: "/confirm-confederation",
        icon: <AiOutlineUsergroupAdd />,
        user: "confederation",
    },
    // {
    //     key: 2,
    //     name: "Cooperatives",
    //     link: "/cooperatives",
    //     icon: <AiOutlineOrderedList />,
    //     user: "confederation",
    // },
    {
        key: 3,
        name: "Members",
        link: "/members",
        icon: <AiOutlineUsergroupAdd />,
        user: "members",
    },
    {
        key: 90,
        name: "Tree structure",
        link: "/cooperative-tree",
        icon: <AiOutlineUsergroupAdd />,
        user: "members",
    },
    {
        key: 90,
        name: "Tree structure",
        link: "/union-tree",
        icon: <AiOutlineUsergroupAdd />,
        user: "union",
    },
    {
        key: 90,
        name: "Tree structure",
        link: "/federation-tree",
        icon: <AiOutlineUsergroupAdd />,
        user: "federation",
    },
    {
        key: 900,
        name: "Tree structure",
        link: "/confederation-tree",
        icon: <AiOutlineUsergroupAdd />,
        user: "confederation",
    },
    {
        key: 30,
        name: "Add Existing members",
        link: "/existing-member",
        icon: <AiOutlineUsergroupAdd />,
        user: "members",
    },
    {
        key: 9,
        name: "Members Shares",
        link: "/shares",
        icon: <AiOutlineUserSwitch />,
        user: "members",
    },
    // {
    //     key: 4,
    //     name: "Assets",
    //     link: "/assets",
    //     icon: <AiOutlineTool />,
    //     user: "members",
    // },
    // {
    //     key: 5,
    //     name:"Transactions",
    //     link: "/transactions",
    //     icon: <AiOutlineAccountBook />,
    //     user: "members",
    // },
    // {
    //     key: 6,
    //     name: "Purchase",
    //     link: "/purchase",
    //     icon: <AiOutlineShoppingCart />,
    //     user: "members",
    // },
    // {
    //     key: 7,
    //     name: "Production",
    //     link: "/production",
    //     icon: <AiOutlineOneToOne />,
    //     user: "members",
    // },
    // {
    //     key: 8,
    //     name: "Products",
    //     link: "/products",
    //     icon: <AiOutlineCheckSquare />,
    //     user: "members",
    // },
    // {
    //     key: 10,
    //     name: "Credits & Loans",
    //     link: "/credits",
    //     icon: <AiFillDollarCircle />,
    //     user: "members",
    // },
    // {
    //     key: 11,
    //     name: "Stock",
    //     link: "/stock",
    //     icon: <AiTwotoneTool />,
    //     user: "members",
    // },
    {
        key: 12,
        name: "My profile",
        link: "/profile",
        icon: <AiOutlineUser />,
        user: "all",
    },
]