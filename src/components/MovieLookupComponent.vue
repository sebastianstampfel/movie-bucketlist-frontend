<template>
    <div class="verification-box">
        <b-row>
            <b-col cols=12>
                <h2>Login</h2>
            </b-col>
            <b-col>
                <b-form @submit="onSubmit">
                    <b-form-group
                        id="input-group-1"
                        label="Admin code"
                        label-for="input-1"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="passphrase"
                        type="password"
                        required
                        placeholder="Enter passphrase"
                        ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="warning">Submit</b-button>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'MovieLookupComponent',
    data(){
        return {
            verified: false,
            passphrase: ''
        }
    },
    created: function(){

    },
    methods: {
        onSubmit: function(){
            if(this.passphrase == this.$adminSecret){
                this.$cookies.set("MOVIELIST_verified", true)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.verification-box {
    margin-top: 55vh;
    background: #343A40;
    padding: 1em;
    border-radius: 10px;
    border: 2px solid #E4AE0B;
}
</style>