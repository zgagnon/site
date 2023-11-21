<script lang="ts">
import Work from './work.svelte';
import Project from './project.svelte';
</script>

<div class="w-[800px] mt-6">
	<h1 class="text-5xl">Experience</h1>
	<hr class="mb-8" />
	<Work
		bullets="{[
			'Principal engineer for seed series startup. Responsible for all technical direction.',
			'Owned vendor relationships, from selection to implementation.',
			'Instrumental in company strategy, introduced frameworks to analyze potential customer segments, assess needs, and identify product opportunities.',
		]}"
		location="Beacon NY"
		name="Orgspace"
		time="Oct 2021 - Present"
		title="Principal Engineer"
	/>

	<Work
		bullets="{[
			'First engineering manager in the company, with a team of eight engineers. Established all processes for leveling, coaching, and performance management.',
			'With CTO, planned growth strategy. Developed sourcing plan, interviews, and hiring process.',
			'Identified strategic needs and created software solutions, company-wide.',
		]}"
		location="Brooklyn NY"
		name="Parachute Health"
		time="Jun 2020 - Oct 2021"
		title="Software Engineering Manager"
	/>

	<Work
		bullets="{[
			'Manager and Technical Lead for a team of six Software Engineer and Software Engineer in Test personnel.',
			'Leader in technical and process strategy across the company, introducing several new technical innovations and improving work streams.',
			'Management consultant to other managers. Led working groups to formalize leveling and career development across the engineering organization.',
		]}"
		location="New York NY"
		name="Meetup"
		time="Aug 2018 - Apr 2020"
		title="Software Engineering Manager"
	/>

	<Work
		bullets="{[
			'Coached two software engineers in advancing their careers.',
			'Advanced agile and engineering practices both within and without the company.\n',
			'Developed innovative practices for cloud and micro-services based React front end applications.',
		]}"
		location="New York NY"
		name="Pivotal Labs"
		time="Dec 2017 - Aug 2018"
		title="Software Engineering Manager"
	/>

	<Work
		bullets="{[
			'Led balanced product development teams and multi-team efforts to deliver high impact software for Fortune 100 clients.',
			'Enabled developers and stakeholders in evidence-driven, value-first agile software development.',
			'Designed and implemented sustainable cloud based applications and platforms.',
		]}"
		location="New York NY"
		name="Pivotal Labs"
		time="Oct 2015 - Dec 2017"
		title="Senior Software Engineer"
	/>

	<Work
		bullets="{[
			'Contributed to ongoing development of Colossus, a high-performance Scala micro-services',
			'Created a proxy server designed to run in Amazon EC2 cloud services which reduced S3 transfers and lowered monthly transfer costs by one sixth.',
			'Developed a solution for real-time updates using the Tumblr firehose, generating over 1 million Redis increments a second.',
		]}"
		location="New York NY"
		name="Tumblr"
		time="Nov 2014 - Aug 2015"
		title="Services Engineer"
	/>

	<Work
		bullets="{[
			'Created a system for ingestion, normalization, and display of location based data using Scala, Akka, and Mongo',
		]}"
		location="Denver CO"
		name="Placeable"
		time="Oct 2013 - Nov 2014"
		title="Scala Developer"
	/>

	<Work
		bullets="{[
			'Developed and maintained industry-leading cross-channel business analysis tools in Java using distributed GreenPlum databases and GridGain compute grids.',
		]}"
		location="Denver CO"
		name="ClickFox"
		time="Aug 2011 - Aug 2013"
		title="Software Engineer"
	/>

	<Work
		bullets="{[
			'Lead developer on a time-card entry system presented in the Eclipse Rich Application Platform, hosted using GlassFish OSGI, to integrate with the Innoprise enterprise resource planning tools.',
		]}"
		location="Broomfield CO"
		name="Innoprise Software"
		time="Aug 2010 - May 2011"
		title="Java Engineer"
	/>

	<Work
		bullets="{[
			'Developed and implemented test plans, software tools, and accessibility code for e-learning software.',
		]}"
		location="Golden CO"
		name="Regis Learning Solutions"
		time="Mar 2009 - Aug 2011"
		title="Lead Software Quality Assurance / Software Developer"
	/>

	<h1 class="text-5xl">Education</h1>
	<Work
		bullets="{[]}"
		location="Denver CO"
		name="Metropolitan State University of Denver"
		time="2006 - 2010"
		title="B.S. Computer Science"
	/>
	<h1 class="text-5xl">Organization and Public Appearances</h1>
	<Project
		bullets="{[
			'Write/Speak/Code was an 501c(3) organization dedicated to elevating women and non-binary people in thought leadership. As Treasurer, I had responsibility for ensuring the organization was compliant with all\n' +
				'\t applicable laws and had the finances available to accomplish its goals. As a general member of the board I set the direction of the organization.',
		]}"
		name="Write/Speak/Code"
		time="2020-2022"
		title="Treasurer"
	/>
	<Project
		bullets="{[
			'The Write/Speak/Code conference was an annual event drawing up to 1500 attendees. The 2019 conference was held in San Francisco. As the Conference Content Chair, I was responsible for the Call for Proposals process,\n' +
				'\tchaired the content selection committee, and coordinated with speakers and event staff to ensure the smooth operation of content.',
		]}"
		name="Write/Speak/Code"
		time="2019"
		title="Conference Content Chair"
	/>
	<Project
		bullets="{[
			'Global Diversity CFP Day is an international event of workshops designed to help attendees submit their first conference talk proposal. I was an organizer and presenter of the New York City event three years running. I created \n' +
				'\tand delivered a full day curriculum, coordinated individual coaches, and assisted in sponsorship, venue, and vendor activities.',
		]}"
		name="Global Diversity CFP Day"
		time="2018,2019,2020"
		title="Organizer and Presenter"
	/>
	<Project
		bullets="{[
			'The Write/Speak/Code New York Chapter was the local chapter of the national Write/Speak/Code organization. We held monthly talks and workshops in the New York area. As an organizer, I sourced speakers, venues, and sponsors.',
		]}"
		name="Write/Speak/Code"
		time="2016-2020"
		title="New York City Chapter Organizer"
	/>
	<Project
		bullets="{[
			'Codebar is a non-profit organization that facilitates the growth of a diverse tech community by running regular programming workshops. I was a mentor at the New York City chapter.',
		]}"
		name="Codebar"
		time="2015-2018"
		title="Mentor"
	/>
	<Project
		bullets="{[
			'Write/Speak/Code Conference - 2019',
			'Women Who Code Connect- Mono and Micro, Mar 2018',
			'Global Diversity CFP Day - Workshop Facilitator, 2018,2019,2020',
			'Spring One Conference - Solid In The Wild, Dec 2017',
			'Write/Speak/Code - Workshop facilitator, Nov 2017',
			'Pivotal Tech Talk Tuesdays - Introduction to Reactive Streams, Jun 2017',
			'Write/Speak/Code - Product Killers, Dec 2016',
			'She Says Horror Stories 2 - Panelist, Oct 2016',
			'CODE Debugging the Gender Gap Screening - Panelist, May 2016',
		]}"
		name="Public Appearances"
	/>
	<Project
		bullets="{[
			'Being Your Authentic Self - Interview, Built To Adapt',
			'Asking for Gender in Applications - Article, Built To Adapt',
		]}"
		name="Text Media"
	/>
</div>
