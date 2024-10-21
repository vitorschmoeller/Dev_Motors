import { Hero } from '@/components/Hero'
import styles from './styles.module.scss'
import {getItemBySlug} from '@/utils/actions/get-data'
import { PostProps } from '@/utils/post.type'
import { Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import Image from 'next/image'
import {Metadata} from 'next'

export async function generateMetadata({params: {slug}}: { params: {slug : string}}): Promise<Metadata>{

    try{
        const {objects}: PostProps = await getItemBySlug(slug)
        .catch(() => {
            return {
                title: "DevMotors - sua oficina especializada",
                description: "Oficina de carros",
            }
        })

        return {
            title: `DevMotors - ${objects[0].title}`,
            description: `${objects[0].metadata.description.text}`,
            keywords: ["devmotors", "troca de oleo"],
            openGraph: {
                title: `DevMotors - ${objects[0].title}`,
                images: [objects[0].metadata.banner.url]
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                }
            } 
        }
    }catch(err){
        return {
            title: "DevMotors - sua oficina especializada",
            description: "Oficina de carros",
        }
    }
}

export default async function Page({params: {slug}}: { params: {slug : string}}){
    const data: PostProps = await getItemBySlug(slug)
    //Para conseguir ver todo o objeto
    console.log(JSON.stringify(data, null, 2))
    return(
        <>
        <Hero 
            heading={data.objects[0].title}
            buttonTitle={data.objects[0].metadata.button.title}
            buttonUrl={data.objects[0].metadata.button.url}
            bannerUrl={data.objects[0].metadata.banner.url}
            icon={<Phone size={24} color="#fff"/>}
        />
        <Container>
            <section className={styles.about}>
                <article className={styles.innerAbout}>
                    <h1 className={styles.title}>
                        {data.objects[0].metadata.description.title}
                    </h1>
                    <p>
                        {data.objects[0].metadata.description.text}
                    </p>

                    {data.objects[0].metadata.description.button_active && (
                        <a 
                        href={data.objects[0].metadata.description.button_url as string}
                        target='_blank'
                        className={styles.link}
                        >
                            {data.objects[0].metadata.description.button_title}
                        </a>
                    )}
                </article>
                <div className={styles.bannerAbout}>
                    <Image
                        className={styles.imageAbout}
                        alt={data.objects[0].title}
                        quality={100}
                        fill={true}
                        priority={true}
                        src={data.objects[0].metadata.description.banner.url}
                        sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 50vw"
                    />
                </div>
            </section>
        </Container>
        </>
    )
}