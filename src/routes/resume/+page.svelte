<script lang="ts">
import Work from './work.svelte';
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
		title="Principle Engineer"
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
</div>
