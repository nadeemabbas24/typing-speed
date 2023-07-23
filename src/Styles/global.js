import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   *{
     box-sizing:border-box;
    }

    body{
        background:${({ theme }) => theme.background};
        color:${({ theme }) => theme.textColor};
        margin:0;
        padding:0;
        transition:all 0.25s linear;
    }
    .upper-menu{
        display:flex;
        width:1000px;
        margin-right:auto;
        margin-left:auto;
        justify-content:space-between;
        font-size:1.35rem;
        padding:0.5rem;
    }
    .modes{
        display:flex;
        gap:0.4rem;
    }
    .time-mode:hover{
        color:green;
        cursor:pointer;
    }

    .canvas{
        display:grid;
        padding:2rem;
        gap:0.5rem;
        min-height:100vh;
        width:100vw;
        grid-template-row:auto 1fr auto;
        grid-auto-flow:row;
        text-align:center;
        align-items:center;
    }
    .type-box{
        display:block;
        margin-left:auto;
        margin-right:auto;
        max-width:1000px;
        height:140px;
    }

    .words{
        display:flex;
        flex-wrap:wrap;
        font-size:24px;
        color:${({ theme }) => theme.typeBoxText};
    }
    .word{
        margin:5px;
        padding-right:2px;
    }
    .hiden-input{
        opacity:0;
    }

    .correct{
       color:${({ theme }) => theme.textColor};
    }
    .incorrect{
       color:red;
    }
    .current{
        border-left:1px solid;
        animation: blink 2s infinite;
        animation-timing-function:ease;
    
    @keyframes blink{
        0%{border-left-color:${({ theme }) => theme.textColor};}
        25%{border-left-color:${({ theme }) => theme.background};}
        50%{border-left-color:${({ theme }) => theme.textColor};}
        75%{border-left-color:${({ theme }) => theme.background};}
        100%{border-left-color:${({ theme }) => theme.textColor};}
    }}

     .current-right{
        border-right:1px solid;
        animation: blinkright 2s infinite;
        animation-timing-function:ease;
    
    @keyframes blinkright{
        0%{border-right-color:${({ theme }) => theme.textColor};}
        25%{border-right-color:${({ theme }) => theme.background};}
        50%{border-right-color:${({ theme }) => theme.textColor};}
        75%{border-right-color:${({ theme }) => theme.background};}
        100%{border-right-color:${({ theme }) => theme.textColor};}
    }}

    .footer{
        width:1000px;
        display:flex;
        margin-left:auto;
        margin-right:auto;
        justify-content:space-between;
    }

    .stats-box{
        display:flex;
        width:1000px;
        height:auto;
        margin-left:auto;
        margin-right:auto;
    }
    .left-stats{
        width:30%;
        padding:30px;
    }
    .right-stats{
        width:70%;
    }
.title{
        font-size:20px;
        color:${({ theme }) => theme.typeBoxText};
    }
.subtitle{
        font-size:30px;
    }

.header{
        display:flex;
        width:1000px;
        justify-content:space-between;
        margin-left:auto;
        margin-right:auto;
    }
.user-profile{
        display:flex;
        width:1000px;
        height:15rem;
        border-radius:20px;
        padding:1rem;
        justify-content:center;
        align-items:center;
        background:${({ theme }) => theme.typeBoxText};
        margin:auto;

    }
.user{
        display:flex;
        width:50%;
        border-right:2px solid ;
        padding:1rem;
        justify-content:space-around;
        align-items:center;

    }
.picture{
        width:40%;
    }
.info{
        width:60%;
        font-size:1.5rem;
        padding:1rem;
    }
.total-tests{
        padding:1rem;
        font-size:3.5rem;
    }
.graph {
   width:1000px;
    margin:auto;
}
.table{
    margin:auto;
    width:1000px;
    padding:1rem;
    }
.center-screen{
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
   }
    
`;
