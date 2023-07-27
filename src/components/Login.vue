
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://26.125.18.207:8000/Login', {
          user_em: this.username,
          password: this.password,
        });

        // หากการเข้าสู่ระบบสำเร็จ
        console.log(response.data);
    
        if (response.data.check == 0) {
        localStorage.setItem("Token", response.data.accessToken)
        localStorage.setItem("login", response.data.btn_login)
          this.$router.push('/admin')

        } else if (response.data.check == 1) {
        localStorage.setItem("Token", response.data.accessToken)
        localStorage.setItem("login", response.data.btn_login)
          this.$router.push('/user')
        }

      } catch (error) {
        // หากการเข้าสู่ระบบไม่สำเร็จ
        console.error('Login ไม่สำเร็จ ' + error);
      }
    },
  },
};
</script>

<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card mt-5 shadow-lg">
            <div class="card-header text-center fw-bold fs-5" style="background-color: #3F2305; color: white;">
              เข้าสู่ระบบ
            </div>
            <div class="card-body">
              <form @submit.prevent="login" style="background-color: #F5F5F5;" class="p-5 rounded-3">
                <div class="mb-3">
                  <label for="username" class="form-label">อีเมล์ :</label>
                  <input type="email" v-model="username" class="form-control" id="username" placeholder="ป้อนอีเมล์ของคุณ">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">รหัสผ่าน :</label>
                  <input type="password" v-model="password" class="form-control" id="password" placeholder="ป้อนรหัสผ่านของคุณ">
                </div>
                <div class=" d-flex justify-content-end ">
                  <router-link to="/registor">Registor</router-link>
                </div>
                <div class="text-center mt-5">
                  <button type="submit" class="btn w-50 text-white" style="background-color:#3F2305;">เข้าสู่ระบบ</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style>
  .container {
    margin-top: 50px;
  }
  </style>
  