import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";


export default function PendaftaranSection(){
    return(
        <div className="w-full">
            <br />
            <Typography.H3>Detail Pendaftaran Perkara</Typography.H3>
            <Separator/>
            <br />
            <Typography.P>Pendaftaran Perkara (e-Filing)</Typography.P>
        </div>
    )
}