<template>
    
    <!-- 여기부터 모임 설정 컴포넌트에 들어가면 됨 -->
    <div class="group-settings">
        <h2 class="title">멤버 탈퇴 설정</h2>
        <hr>
        <table class="table table-hover table-mc-light-blue">
            <tbody>
                <tr v-for="member in members" :key="member.memberIdx">
                    <td data-title="td"><div class="memProfile"><div class="box"><img :src="member.memberImg" class="profile"></div><div>{{ member.memberName }}</div></div></td>
                    <td data-title="btn" style="text-align: right"><button @click="allowMemberWithdrawal(member.memberName, member.memberIdx)">강제 탈퇴</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- 여기까지 -->
    
  </template>
  
  <script>
  import {ref, watchEffect} from 'vue';
  import {useRouter, useRoute} from 'vue-router';
  import axios from 'axios';
  
  export default {
    props:{
      memberList: Object
    },
    mounted(){
      /*const script = document.createElement('script');
      script.src =
          'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);*/
    },
    setup(props){
      axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
      const memberIdx = sessionStorage.getItem('memberIdx');

      const route = useRoute();
      const router = useRouter();
      const maxMemberCnt = ref(50);
      const members = ref([{}
        
      ]);

      watchEffect(() => {
        console.log("오냐" + props.memberList);
      });

      const getMemberList = () => {
        let arr = [];
        for(let i = 0; i < Object.keys(props.memberList).length; i++){
          if(props.memberList[i].memberIdx != memberIdx){
            arr.push(props.memberList[i]);
          } 
        }
        let arr2 = [];
        for(let i = 0; i < arr.length; i++){
          arr2.push(arr[i].memberList[0]);
        }
        members.value = arr2;
        
        console.log(arr2);
      }
      getMemberList();
  
      
      const allowMemberWithdrawal = (name, idx) => {
        Swal.fire({
          title: name + '님을 정말 강제 탈퇴시키겠습니까?',
          icon: 'warning',
          showCancelButton : true,
          confirmButtonColor : '#d33',
          confirmButtonText : '강제 탈퇴',
          cancelButtonText : '취소',
          reverseButtons: true
        }).then(async(result) => {
          if(result.isConfirmed){
            // 강제 탈퇴
            try{
              const res = await axios.delete('/onMeetings/' + route.params.id + '/exile', {
                params: {
                  memberIdx: idx
                }
              });
              console.log(res);
              
              if(res.data === 1){
                Swal.fire('강제 탈퇴 완료', '강제 탈퇴가 성공적으로 완료되었습니다.', 'success').then((result) => {
                  if(result.isConfirmed){
                    // router.push({
                    //   name: "RegisterModal",
                    //   params: {id: route.params.id}
                    // });
                    router.go(0);
                  }
                });
                
              } else{
                Swal.fire('강제 탈퇴 불가능', '다시 시도해주세요.', 'error');
              }
            } catch(err){
                console.log(err);
            }
            
          }
        });
      }
  
      
      return{
        maxMemberCnt,

        members,
        allowMemberWithdrawal
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  
  // 현주
  .memProfile{
    display: flex;
    align-items: center;
  }
  .memProfile > div{
    float: left;
  }
  .box {
    width: 100px;
    height: 100px; 
    border-radius: 70%;
    overflow: hidden;
}
.profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
  .group-settings {
  //     display: flex;
  //     flex-direction: column;
  //     margin-right: 20px;
  // //   align-items: center;
      padding-right: 40px;
  }
  
  h2.title {
      margin: 30px 0;
      font-weight: 700;
      font-size: 30px;
      padding-left: 10px;
  }
  
  // .form-group {
  //     margin: 10px;
  // }
  
  // button {
  //     margin: 10px;
  // }
  
  // Tables
  //
  // -----------------
  
  // Baseline styles
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 2rem;
    background-color: #fff;
    > thead,
    > tbody,
    > tfoot {
      > tr {
        > th,
        > td {
          text-align: left;
          padding: 1.6rem/2;
          vertical-align: top;
          border-top: 0;
        }
      }
    }
    > caption + thead,
    > colgroup + thead,
    > thead:first-child {
      > tr:first-child {
        > th,
        > td {
          border-top: 0;
        }
      }
    }
    > tbody + tbody {
      border-top: 1px solid rgba(0,0,0,.12);
    }
  
    // Nesting
    .table {
      background-color: #fff;
    }
  
    // Remove border
    .no-border {
      border: 0;
    }
  }
  
  // Condensed table w/ half padding
  .table-condensed {
    > thead,
    > tbody,
    > tfoot {
      > tr {
        > th,
        > td {
          padding: 1.6rem/2;
        }
      }
    }
  }
  
  
  // Bordered version
  //
  // Add horizontal borders between columns.
  .table-bordered {
    border: 0;
    > thead,
    > tbody,
    > tfoot {
      > tr {
        > th,
        > td {
          border: 0;
          border-bottom: 1px solid #e0e0e0;
        }
      }
    }
    > thead > tr {
      > th,
      > td {
        border-bottom-width: 2px;
      }
    }
  }
  
  
  // Zebra-striping
  //
  // Default zebra-stripe styles (alternating gray and transparent backgrounds)
  .table-striped {
    > tbody > tr:nth-child(odd) {
      > td,
      > th {
        background-color:  #f5f5f5;
      }
    }
  }
  
  // Hover effect
  //
  .table-hover {
    > tbody > tr:hover {
      > td,
      > th {
        background-color: #addaed;
      }
      > td > button {
          background-color: #fff;
          color: #89cbeb;
      }
    }
  }
  
  button {
  //   padding: 10px 20px;
      width: 90px;
      border: none;
      border-radius: 5px;
      background-color: #89cbeb;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
  }
  
  #container{
      grid-template-columns: 2fr 1fr;
  }
  
  .smallText{
      font-size: 13px;
  }
  // 끝
  
  * {
    outline-width: 0 !important;
    font-family: "Roboto";
  }
  body,
  html {
    padding: 0;
    margin: 0;
  }
  
  body > header.nav-closed {
    margin-left: 64px;
  }
  body > header {
    background: url(https://source.unsplash.com/2560x1440/daily) center/cover;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 250px;
  }
  
  $nav: 64px;
  $blue: #03a9f4;
  $green: #4caf50;
  $red: #ff2f20;
  $bgImage: "https://app-storage-edge-003.cafe24.com/bannermanage2/woohua/2020/01/03/9ef96bbacc205f6a2b825e7fa0025b2d.jpg";
  
  :root {
    --bg1: #e5e5e5;
    --bg2: #eee;
    --bg3: #fff;
  
    --color: #000;
  }
  
  #modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s ease;
    background: var(--bg3);
    width: 550px;
    overflow: hidden;
    border-radius: 5px;
    header {
      border-bottom: 1px solid var(--bg2);
      padding: 15px;
      box-sizing: border-box;
      h2 {
        margin: 0;
        font-weight: 400;
        color: var(--color);
      }
    }
    main {
      padding: 15px;
      box-sizing: border-box;
      overflow-y: auto;
      > p {
        margin: 0 0 5px 0;
        color: var(--color);
      }
      .radio-buttons {
        display: flex;
        grid-gap: 15px;
        background: rgb(31, 39, 48);
        padding: 15px;
        box-sizing: border-box;
        label {
          flex: 1;
          display: flex;
          justify-content: center;
          cursor: pointer;
          position: relative;
          padding: 20px 0;
          span {
            color: #fff;
            display: block;
          }
          input {
            display: none;
            &:checked ~ .border {
              box-shadow: inset 0 0 0 2px $blue;
            }
          }
          .border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            user-select: none;
            pointer-events: none;
          }
          &.light {
            background: #fff;
            span {
              color: #000;
            }
          }
          &.dim {
            background: #15202b;
          }
          &.dark {
            background: #111;
          }
          &.nav-style {
            background: var(--bg3);
            span {
              color: var(--color);
            }
          }
        }
      }
    }
    &.toggle {
      opacity: 1;
      visibility: visible;
    }
  }
  #modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    visibility: hidden;
    transition: 0.2s ease;
    z-index: 11;
    &.toggle {
      opacity: 1;
      visibility: visible;
    }
  }
  
  #more-popout-overlay {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    visibility: hidden;
    opacity: 0;
    transition: 0.2s ease;
    &.toggle {
      opacity: 1;
      visibility: visible;
    }
  }
  #more-popout {
    position: fixed;
    width: 250px;
    left: -1px;
    background: var(--bg3);
    height: 100%;
    z-index: 10;
    border-left: 1px solid var(--bg2);
    transition: 0.2s ease;
    .nav-item:first-of-type {
      border-bottom: 1px solid var(--bg2);
      .nav-text span {
        opacity: 0.5;
        font-size: 12px;
        display: block;
      }
    }
    &.nav-closed {
      left: -187px;
      &.toggle {
        left: 64px;
      }
    }
    &.toggle {
      left: 250px;
      &.nav-closed {
        left: 64px;
      }
    }
  }
  
  .wrapper {
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;
    padding-left: 250px;
    &.nav-closed {
      padding-left: $nav;
    }
  }
  
  body {
    background: var(--bg1);
  }
  
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: $nav;
    background: var(--bg3);
    height: 100vh;
    z-index: 10;
    &.nav-closed {
      width: $nav;
      .nav-item p {
        display: none;
      }
    }
  }
  
  .nav-item {
    width: 100%;
    height: $nav;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    color: var(--color);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    user-select: none;
    &.home {
      border-bottom: 1px solid var(--bg2);
      color: $blue;
    }
    .icon-container {
      width: $nav;
      height: $nav;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    i {
      font-size: 18px;
    }
    img {
      width: 32px;
      height: 32px;
      display: block;
      border-radius: 50%;
    }
    p {
      margin: 0;
      font-size: 16px;
    }
    &:hover {
      background: var(--bg2);
    }
    &.logout {
      color: $red !important;
    }
  }
  
  header.nav-closed {
    background: url($bgImage) center/cover;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 250px;
    .wrapper {
      position: relative;
      padding-left: 0;
    }
    .top {
      display: flex;
      align-items: center;
      margin: 30px 0;
      img {
        width: 72px;
        height: 72px;
        display: block;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
      .user {
        margin-left: 15px;
        color: #fff;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 1);
        h2 {
          margin: 0;
          font-weight: 400;
        }
        p {
          margin: 0;
          opacity: 0.5;
        }
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      a {
        text-decoration: none;
        color: #fff;
        padding: 0 5px 10px;
        margin-right: 15px;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 1);
        p {
          margin: 0;
          font-size: 14px;
          opacity: 0.5;
        }
        h3 {
          margin: 0;
          font-weight: 400;
        }
        &:hover {
          box-shadow: inset 0 -4px 0 #fff;
        }
      }
    }
    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 125px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6) 90%);
    }
    &.nav-closed {
      margin-left: $nav;
    }
  }
  
  #container {
    display: grid;
  //   grid-template-columns: 650px auto;
    grid-gap: 20px;
    align-items: flex-start;
    margin: 20px auto 50px;
  }
  #timeline {
    background: var(--bg3);
    border-radius: 5px;
    overflow: hidden;
    footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 25px 0;
      border-top: 1px solid var(--bg2);
      i {
        margin-bottom: 10px;
        color: var(--color);
      }
      button {
        background: transparent;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-weight: 600;
        border-radius: 5px;
        color: var(--color);
        &:hover {
          background: var(--bg2);
        }
      }
    }
  }
  .new-tweet {
    textarea {
      border: none;
      width: 100%;
      resize: none;
      padding: 15px;
      height: auto;
      box-sizing: border-box;
      height: 200px;
      cursor: pointer;
      color: var(--color);
      background: var(--bg3);
      &:focus,
      &:not(:placeholder-shown) {
        height: 100px;
        cursor: text;
        ~ .btns {
          height: 100%;
          padding: 0 15px 15px;
        }
      }
    }
    .btns {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      overflow: visible;
      height: 0;
      .btn {
        margin-right: 10px;
        button {
          padding: 0;
          padding: 0;
          display: block;
          width: 32px;
          height: 32px;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 50%;
          color: var(--color);
          &:hover {
            background: var(--bg2);
          }
        }
        &:last-child {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          margin-right: 0;
          button {
            width: auto;
            border-radius: 3px;
            padding: 0 10px;
            background: $blue;
            color: #fff;
            &:hover {
              background: darken($blue, 3%);
            }
            i {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .tweet {
    border-top: 1px solid var(--bg2);
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    .left {
      margin-right: 15px;
      img {
        width: 42px;
        height: 42px;
        display: block;
        object-fit: cover;
        border-radius: 50%;
        user-select: none;
      }
    }
    .right {
      width: 100%;
      .info {
        display: flex;
        align-items: center;
        color: var(--color);
        margin-bottom: 5px;
        p {
          margin: 0;
          display: flex;
          align-items: center;
          span {
            margin: 0 10px;
            font-size: 12px;
            opacity: 0.5;
          }
        }
        time {
          display: flex;
          align-items: center;
          font-size: 12px;
          opacity: 0.5;
          &:before {
            content: "";
            height: 2px;
            width: 2px;
            margin-right: 10px;
            border-radius: 50%;
            background: var(--color);
          }
        }
      }
      .message {
        p {
          margin: 0;
          color: var(--color);
          line-height: 20px;
        }
        img {
          display: block;
          width: 100%;
          border-radius: 5px;
          margin-top: 10px;
        }
      }
      .btns {
        margin-top: 15px;
        display: flex;
        align-items: center;
        button {
          background: transparent;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          margin-right: 15px;
          cursor: pointer;
          color: var(--color);
          font-size: 12px;
          i {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            margin-right: 5px;
            font-size: 16px;
          }
          &.blue:hover {
            i {
              background: rgba($blue, 0.1);
            }
            color: $blue;
          }
          &.green:hover {
            i {
              background: rgba($green, 0.1);
            }
            color: $green;
          }
          &.red:hover {
            i {
              background: rgba($red, 0.1);
            }
            color: $red;
          }
        }
      }
    }
    &:hover {
      background: var(--bg2);
    }
  }
  .iframe-container {
    overflow: hidden;
    padding-top: 56.25%;
    position: relative;
    border-radius: 5px;
    display: block;
    margin-top: 10px;
    iframe {
      border: 0;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
  
  .search-container {
    margin-bottom: 20px;
    .search-input {
      width: 100%;
      position: relative;
      input {
        background: var(--bg3);
        border: none;
        box-sizing: border-box;
        width: 100%;
        color: var(--color);
        padding: 15px 15px 15px 55px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 500;
        &:not(:placeholder-shown) ~ i {
          opacity: 1;
        }
      }
      i {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.4;
        pointer-events: none;
        user-select: none;
        color: var(--color);
      }
    }
    .search-results {
      border-top: 1px solid var(--bg2);
      background: var(--bg3);
      border-radius: 0 0 5px 5px;
      overflow: hidden;
      display: none;
      .result {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        color: var(--color);
        p {
          margin: 0;
        }
        img {
          width: 42px;
          height: 42px;
          display: block;
          margin-right: 15px;
          object-fit: cover;
          border-radius: 50%;
        }
        span {
          display: block;
          opacity: 0.5;
          font-size: 12px;
        }
        &:hover {
          background: var(--bg2);
          cursor: pointer;
        }
        &:last-child p {
          font-size: 12px;
        }
      }
      hr {
        border: none;
        height: 1px;
        background: var(--bg2);
        margin: 0;
      }
    }
  }
  
  #right {
    section {
      padding: 15px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--bg2);
      background: var(--bg3);
      overflow: hidden;
      header {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        h3 {
          flex: 1;
          font-weight: 400;
          margin: 0;
          color: var(--color);
        }
        button {
          padding: 0;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 24px;
          height: 24px;
          color: var(--color);
          &:hover {
            background: var(--bg2);
          }
        }
        a {
          text-decoration: none;
          font-size: 12px;
          color: $blue;
        }
      }
      &:first-of-type {
        border-radius: 3px 3px;
      }
      &:last-of-type {
        border-bottom: none;
        border-radius: 0 0 3px 3px;
      }
    }
    main {
      a {
        text-decoration: none;
        color: var(--color);
        margin-bottom: 15px;
        display: block;
        &:not(.trend) {
          display: flex;
          align-items: center;
        }
        img {
          width: 42px;
          height: 42px;
          display: block;
          object-fit: cover;
          border-radius: 50%;
        }
        .trend-num {
          font-size: 12px;
          opacity: 0.5;
        }
        .trend {
          p {
            margin: 2px 0;
          }
          span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
          }
          .quote {
            border-radius: 5px;
            overflow: hidden;
            display: flex;
            align-items: center;
            border: 1px solid var(--bg2);
            margin-top: 5px;
            .info {
              flex: 1;
              padding: 10px;
              box-sizing: border-box;
              border-right: 1px solid var(--bg2);
            }
            img {
              border-radius: 0;
              width: 61px;
              height: 61px;
            }
            &:hover {
              background: var(--bg2);
              .info > p {
                color: $blue;
              }
            }
          }
        }
        .user {
          margin-left: 15px;
          p {
            margin: 0;
            display: flex;
            align-items: center;
            small {
              margin-left: 5px;
            }
          }
          span {
            font-size: 12px;
            opacity: 0.5;
            display: block;
          }
        }
        &:hover > .user p,
        &:hover > .trend > p {
          color: $blue;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  </style>
  