import HaLachmaAnya from './HaLachmaAnya';
import FourQuestions from './FourQuestions';
import AvadimHayinu from './AvadimHayinu';
import FourSons from './FourSons';
import TenPlagues from './TenPlagues';
import Dayenu from './Dayenu';
import PesachMatzahMaror from './PesachMatzahMaror';
import SecondCup from './SecondCup';
import { haggadahText } from '../../content/haggadah';
import SectionText from '../../components/SectionText';

export default function Maggid() {
  const section = haggadahText['maggid'];

  return (
    <div className="space-y-24">
      <SectionText
        instructions={section.instruction}
        body={section.content.join('\n\n')}
        commentary={section.commentary}
      />
      <HaLachmaAnya />
      <FourQuestions />
      <AvadimHayinu />
      <FourSons />
      <TenPlagues />
      <Dayenu />
      <PesachMatzahMaror />
      <SecondCup />
    </div>
  );
}
