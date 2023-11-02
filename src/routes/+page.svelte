<script>
    import portrait from '$lib/assets/portrait.jpg'
    import banner from '$lib/assets/banner1.jpg'
</script>

<div class="w-full h-64 object-cover object-center brightness-75 flex flex-col justify-around pl-6"
     style="background-image: url({banner})">
    <h1 class="text-9xl text-white font-sacramento">Zoe Gagnon</h1>
</div>
<div class="flex flex-row space-x-6">
    <div class="flex-1"/>
    <div class="w-[800px] drop-shadow-bg-slate-50 mt-6 rounded-2xl p-6">
        <p class="p-3">
            I am a seasoned technology leader with a rich and diverse career in
            software engineering and management roles. Most recently, I have been
            Principal Engineer, responsible for setting the technical direction
            and nurturing crucial vendor relationships at a seed series startup.
        </p>
        <img src={portrait} alt="A headshot featuring Zoe Gagnon" class="rounded w-3/5 block float-right m-3 drop-shadow"/>
        <p class="p-3">
            My experience also includes roles as a Software Engineering Manager,
            where I established team processes, coached engineers, and
            developed innovative software solutions. I have a history of leading
            technical innovation, improving workflow efficiency, and driving the
            career development of engineering professionals. I've been a speaker
            and organizer of several conferences and meetups, and I'm passionate
            about elevating those around me in the industry.
        </p>
        <p class="p-3">
            In my personal life, I enjoy outdoor activities like hiking and motorcycling,
            as well as pursuing stationary hobbies.
        </p>
        <p class="p-3">
                With a proven track record in technology leadership and a passion for
                driving innovation, I am well-equipped to excel in software engineering
                and management roles.
        </p>
    </div>

    <div class="flex-1"/>

</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.stone.50);
    }
</style>