<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-12">
          <div class="card mt-5 shadow-lg">
            <div class="card-header text-center fw-bold fs-5" style="background-color: #3F2305; color: white;">
              สมัครสมาชิก
            </div>
            <div class="card-body">
              <form @submit.prevent="register" style="background-color: #F5F5F5;" class="p-4 rounded-3">
                <!-- colume 1 -->
                <div class="row gx-5 "  >
                    <div class="col-lg-6 pe-5 "  >
                    <div class="mb-3">
                  <label for="firstName" class="form-label">ชื่อ :</label>
                  <input type="text" v-model="firstName" class="form-control" id="firstName" placeholder="ป้อนชื่อของคุณ">
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">นามสกุล :</label>
                  <input type="text" v-model="lastName" class="form-control" id="lastName" placeholder="ป้อนนามสกุลของคุณ">
                </div>
                <div class="mb-3 ">
                    <label for="email" class="form-label">อีเมล์ :</label>
                    <input type="email" v-model="email" class="form-control" id="email" placeholder="ป้อนอีเมล์ของคุณ">
                </div>
                <div class="mb-3 ">
                  <label for="password" class="form-label">รหัสผ่าน :</label>
                  <input type="password" v-model="password" class="form-control" id="password" placeholder="ป้อนรหัสผ่านของคุณ">
                </div>
                </div>
                <!-- colume 2 -->
                <div class="col-lg-6" >
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label">เบอร์โทรศัพท์ :</label>
                  <input type="tel" v-model="phoneNumber" class="form-control" id="phoneNumber" placeholder="ป้อนเบอร์โทรศัพท์ของคุณ">
                </div>
                <!-- <div class="mb-3 ">
                  <label for="gender" class="form-label">เพศ :</label>
                  <select v-model="gender" class="form-control" id="gender">
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </select>
                </div> -->
                <div class="mb-3">
                    <label for="gender" class="form-label">เพศ :</label>
                    <div class="d-flex justify-content-around">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="gender" id="male" value="male">
                        <label class="form-check-label" for="male">ชาย</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="gender" id="female" value="female">
                        <label class="form-check-label" for="female">หญิง</label>
                      </div>
                    </div>
                    </div>
          
                <div class="mb-3  ">
                  <label for="customerEmail" class="form-label">ที่อยู่ลูกค้า :</label>
                  <textarea v-model="customerAddr" class="form-control " id="customerAddr" placeholder="ป้อนที่อยู่ลูกค้า" rows="5"></textarea>
                  <!-- <input type="text" v-model="customerAddr" class="form-control " id="customerAddr" placeholder="ป้อนที่อยู่ลูกค้า" style="height: 150px;"> -->
                </div>

                </div>
         
                </div>

                <div class="d-flex justify-content-end ">
                    
                </div>
                <div class="row justify-content-end">
                 <div class=" d-flex justify-content-center text-center mt-5 col-lg-4  justify-content-lg-start ">
                    <router-link to="/" class="btn btn-link w-50 text-decoration-none text-white" style="background-color:#3F2305;">Login</router-link>
                </div>
                 <div class=" d-flex justify-content-center text-center mt-5 col-lg-4  justify-content-lg-end ">
                  <button type="submit" class="btn w-50 text-white" style="background-color:#3F2305;">สมัครสมาชิก</button>
                </div>
                 <div class="text-center mt-5 col-lg-3">
                  <button type="buton" @click="clearForm" class="btn w-50 text-white" style="background-color:#3F2305;">ยกเลิก</button>
                </div>

                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: 'male',
        phoneNumber: '',
        customerAddr: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://26.125.18.207:8000/Register', {
            user_em: this.email,
            password: this.password,
            customer_fname: this.firstName,
            customer_lname: this.lastName,
            customer_gender: this.gender ,
            customer_tel: this.phoneNumber,
            customer_address: this.customerAddr
          });
  
          // หากการลงทะเบียนสำเร็จ
          console.log(response.data);
          this.clearForm()
          // ทำอะไรสักอย่างหลังจากลงทะเบียนสำเร็จ เช่น นำผู้ใช้ไปที่หน้าอื่น
  
        } catch (error) {
          // หากการลงทะเบียนไม่สำเร็จ
          console.error('การลงทะเบียนไม่สำเร็จ ' + error);
        }
      },
      clearForm() {
      this.email = '';
      this.password = '';
      this.firstName = '';
      this.lastName = '';
      this.gender = 'male';
      this.phoneNumber = '';
      this.customerAddr = '';
    }
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 50px;
  }
  </style>
  